// https://github.com/wrapper/wrapper-js
import _ from "underscore"
import { camelize } from "underscore.string"
import $ from 'jquery'
import jQuery from 'jquery'

var statusCodes = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested Range Not Satisfiable",
    417: "Expectation Failed",
    420: "Enhance Your Calm",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Unordered Collection",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    444: "No Response",
    449: "Retry With",
    499: "Client Closed Request",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    509: "Bandwidth Limit Exceeded",
    510: "Not Extended",
    511: "Network Authentication Required"
}

jQuery.byteLength = function (str){
	// This basically figures out how many bytes a UTF-16 string (which is what js sees)
	// will take in UTF-8 by replacing a 2 byte character with 2 *'s, etc, and counting that.
	// Note, surrogate (\uD800-\uDFFF) characters are counted as 2 bytes, since there's two of them
	// and the actual character takes 4 bytes in UTF-8 (2*2=4). Might not work perfectly in
	// edge cases such as illegal sequences, but that should never happen.

	// https://en.wikipedia.org/wiki/UTF-8#Description
	// The mapping from UTF-16 code units to UTF-8 bytes is as follows:
	// > Range 0000-007F: codepoints that become 1 byte of UTF-8
	// > Range 0080-07FF: codepoints that become 2 bytes of UTF-8
	// > Range 0800-D7FF: codepoints that become 3 bytes of UTF-8
	// > Range D800-DFFF: Surrogates (each pair becomes 4 bytes of UTF-8)
	// > Range E000-FFFF: codepoints that become 3 bytes of UTF-8 (continued)

	return str
		.replace( /[\u0080-\u07FF\uD800-\uDFFF]/g, '**' )
		.replace( /[\u0800-\uD7FF\uE000-\uFFFF]/g, '***' )
		.length
}

function wrapper(config){

	config = config || {}
	config.headers = config.headers || {
		"user-agent": "wrapper DAPP"
	}

	this.config = config
	this.debug = config.debug

	this.constants = {
		"name": "wrapper",
		"description": "A Node.JS module, which provides an object oriented wrapper for the wrapper API.",
		"protocol": "http",
		"host": "localhost",
		"port": 443,
		"documentation": "",
		"dateFormat": "YYYY-MM-DDTHH:MM:SSZ",
		"requestFormat": "json",
		"requestMedia": "application/json"
	}

	this.requestHeaders = ["User-Agent", "Accept"]
	this.responseHeaders = ["Link", "Location", "Last-Modified", "Status"]

	$.ajax({
		method: "GET",
		url: `http://${this.config.host}:${this.config.port}/docs`
		// data: { name: "John", location: "Boston" }
	}).done(spec => {
		this.routes = spec[this.config.version]
		this.setupRoutes()
	})
}


(function(){

	/**
	 * Setup routes.
	 * @return {[type]} [description]
	 */
	this.setupRoutes = function(){

		let self = this

		function trim(s){
			if (typeof s != "string") return
			return s.replace(/^[\s\t\r\n]+/, "").replace(/[\s\t\r\n]+$/, "")
		}

		function parseParams(msg, paramsStruct){

			let params = Object.keys(paramsStruct)
			let paramName, def, value, type

			for (let i = 0, l = params.length; i < l; ++i){
				paramName = params[i]
				if (paramName.charAt(0) == "$"){
					paramName = paramName.substr(1)
					if (!defines.params[paramName]){
						throw new Error("Invalid variable parameter name substitution; param '" +
						paramName + "' not found in defines block", "fatal") // BadRequest
					} else {
						def = paramsStruct[paramName] = defines.params[paramName]
						delete paramsStruct["$" + paramName]
					}
				} else {
					def = paramsStruct[paramName]
				}

				if (typeof msg[paramName] === 'object'){
					msg[paramName] = JSON.stringify(msg[paramName])
				}

				value = trim(msg[paramName])

				if (typeof value != "boolean" && !value){
					// we don't need to validation for undefined parameter values that are not required.
					if (!def.required || (def["allow-empty"] && value === "")) continue
					throw new Error("Empty value for parameter '" + paramName + "': " + value) // BadRequest
				}

				// validate the value and type of parameter:
				if (def.validation){
					if (!new RegExp(def.validation).test(value)){
						throw new Error("Invalid value for parameter '" + paramName + "': " + value) // BadRequest
					}
				}

				if (def.type){
					type = def.type.toLowerCase()
					if (type == "number"){
						value = parseInt(value, 10)
						if (isNaN(value)){
							throw new Error("Invalid value for parameter '" + paramName + "': " + msg[paramName] + " is NaN") // BadRequest
						}
					} else if (type == "float") {
						value = parseFloat(value)
						if (isNaN(value)) {
							throw new Error("Invalid value for parameter '" + paramName + "': " + msg[paramName] + " is NaN") // BadRequest
						}
					} else if (type == "json") {
						if (typeof value == "string") {
							try {
								value = JSON.parse(value)
							}
							catch(ex) {
								throw new Error("JSON parse error of value for parameter '" + paramName + "': " + value) // BadRequest
							}
						}
					} else if (type == "date") {
						value = new Date(value)
					}
				}

				msg[paramName] = value
			}
		}

		function prepareApi(struct, baseType){

			if (!baseType) baseType = ""

			Object.keys(struct).forEach(routePart => {

				let block = struct[routePart]
				if (!block) return
				let messageType = baseType + "/" + routePart

				if (block.url && block.params){

					// we ended up at an API definition part!
					let endPoint = messageType.replace(/^[\/]+/g, "")
					let parts = messageType.split("/")
					let section = jQuery.camelCase(parts[1].toLowerCase())
					parts.splice(0, 2)
					let funcName = jQuery.camelCase(parts.join("-"))

					if (!self[section]){
						self[section] = {}
							// add a utility function 'getFooApi()', which returns the
							// section to which functions are attached.
							self[jQuery.camelCase("get-" + section + "-api")] = function(){
							return self[section]
						}
					}

					self[section][funcName] = function(msg, callback){
						try {
							parseParams(msg, block.params)
						} catch (ex) {
							// when the message was sent to the client, we can
							// reply with the error directly.
							self.sendError(ex, block, msg, callback)
							if (self.debug) console.log(ex.message, "fatal")
							// on error, there's no need to continue.
							return
						}
						self.handler(msg, JSON.parse(JSON.stringify(block)), callback)
					}
				} else {
					// recurse into this block next:
					prepareApi(block, messageType)
				}
			})
		}

		prepareApi(this.routes)
	}

	/**
	 * Authenticate.
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	this.authenticate = function(options){

		if (!options){
			this.auth = false
			return
		}

		if (!options.type || "token".indexOf(options.type) === -1){
			throw new Error("Invalid authentication type, must be 'token'")
		}

		if (options.type == "token" && !options.token){
			throw new Error("Token authentication requires a token to be set")
		}

		this.auth = options
	}

	/**
	 * Get request format.
	 * @param  {Boolean} hasBody [description]
	 * @param  {[type]}  block   [description]
	 * @return {[type]}          [description]
	 */
	function getRequestFormat(hasBody, block){
		if (hasBody) return block.requestFormat || this.constants.requestFormat
		return "query"
	}

	/**
	 * Get query and URL.
	 * @param  {[type]} msg    [description]
	 * @param  {[type]} def    [description]
	 * @param  {[type]} format [description]
	 * @param  {[type]} config [description]
	 * @return {[type]}        [description]
	 */
	function getQueryAndUrl(msg, def, format, config){

		let url = def.url
		if (config.pathPrefix && url.indexOf(config.pathPrefix) !== 0){
			url = config.pathPrefix + def.url
		}
		let ret = {
			query: format == "json" ? {} : format == "raw" ? msg.data : []
		}
		if (!def || !def.params){
			ret.url = url
			return ret
		}

		Object.keys(def.params).forEach(paramName => {

			paramName = paramName.replace(/^[$]+/, "")
			if (!(paramName in msg)) return

			let isUrlParam = url.indexOf(":" + paramName) !== -1
			let valFormat = isUrlParam || format != "json" ? "query" : format
			let val

			if (valFormat != "json"){
				if (typeof msg[paramName] == "object"){
					try {
						msg[paramName] = JSON.stringify(msg[paramName])
						val = encodeURIComponent(msg[paramName])
					} catch (ex){
						return console.log("httpSend: Error while converting object to JSON: " + (ex.message || ex), "error")
					}
				} else if (def.params[paramName] && def.params[paramName].combined){
					// check if this is a combined (search) string.
					val = msg[paramName].split(/[\s\t\r\n]*\+[\s\t\r\n]*/).map(part => encodeURIComponent(part)).join("+")
				} else {
					val = encodeURIComponent(msg[paramName])
				}
			} else {
				val = msg[paramName]
			}

			if (isUrlParam){
				url = url.replace(":" + paramName, val)
			} else {
				if (format == "json" && def.params[paramName].sendValueAsBody){
					ret.query = val
				} else if (format == "json"){
					ret.query[paramName] = val
				} else if (format != "raw"){
					ret.query.push(paramName + "=" + val)
				}
			}
		})

		ret.url = url
		return ret
	}

	this.sendError = function(err, block, msg, callback){
		if (this.debug) console.log(err, block, msg, "error")
		if (typeof err == "string") err = Error(err) // InternalServerError
		if (callback && typeof(callback) === "function") callback(err)
	}

	this.handler = function(msg, block, callback){
		this.httpSend(msg, block, (err, res) => {
			if (err) return this.sendError(err, msg, null, callback)

			let ret

			try {
				ret = res.data && JSON.parse(res.data)
			} catch (ex){
				if (callback) callback(Error(ex.message), res) // InternalServerError
				return
			}

			if (!ret){
				ret = {}
			}

			ret.meta = {}

			this.responseHeaders.forEach(header => {
				if (res.headers[header]) {
					ret.meta[header] = res.headers[header]
				}
			})

			if (callback) callback(null, ret)
		})
	}

	this.httpSend = function(msg, block, callback){

		let self = this

		let method = block.method.toLowerCase()
		let hasFileBody = block.hasFileBody
		let hasBody = !hasFileBody && ("head|get|delete".indexOf(method) === -1)
		let format = getRequestFormat.call(this, hasBody, block)
		let obj = getQueryAndUrl(msg, block, format, self.config)
		let query = obj.query
		let url = this.config.url ? this.config.url + obj.url : obj.url
		let path = url
		let protocol = this.config.protocol || this.constants.protocol || "http"
		let host = block.host || this.config.host || this.constants.host
		let port = this.config.port || this.constants.port || (protocol == "https" ? 443 : 80)

		if (!hasBody && query.length){
			path += "?" + query.join("&")
		}

		let headers = {
			"host": host,
			"content-length": "0"
		}

		if (hasBody){
			if (format == "json"){
				query = JSON.stringify(query)
				console.log(query)
			} else if (format != "raw"){
				query = query.join("&")
			}
			// headers["content-length"] = Buffer.byteLength(query, "utf8")
			headers["content-type"] = format == "json"
				? "application/json; charset=utf-8"
				: format == "raw"
					? "text/plain; charset=utf-8"
					: "application/x-www-form-urlencoded; charset=utf-8"
		}

		if (this.auth){
			let basic
			switch (this.auth.type) {
				case "token":
					headers["auth-token"] = this.auth.token
					break
				default:
					break
			}
		}

		function callCallback(err, result){
			if (callback){
				let cb = callback
				callback = undefined
				cb(err, result)
			}
		}

		function addCustomHeaders(customHeaders){
			Object.keys(customHeaders).forEach(header => {
				let headerLC = header.toLowerCase()
				if (self.requestHeaders.indexOf(headerLC) == -1) return
				headers[headerLC] = customHeaders[header]
			})
		}

		msg = msg || {}

		addCustomHeaders(jQuery.extend(msg.headers || {}, this.config.headers))

		if (!headers["user-agent"]){
			headers["user-agent"] = "JavaScript HTTP Client"
		}

		if (!("accept" in headers)){
			headers.accept = this.config.requestMedia || this.constants.requestMedia
		}

		let options = {
			host: host,
			port: port,
			path: path,
			method: method,
			headers: headers
		}

		if (this.debug) console.log("REQUEST: ", options)

		let opts = {
			url: `http://${this.config.host}:${this.config.port}${path}`,
			method: method,
			data: JSON.parse(query)
		}

		function httpSendRequest(){

			$.ajax(opts).done((data, textStatus, jqXHR) => {
				console.log(data)
			}).fail((jqXHR, textStatus, errorThrow) => {
				console.log(jqXHR)
				console.log(textStatus)
				console.log(errorThrow)
			})

			// let req = require(reqModule).request(options, res => {
			// 	if (self.debug){
			// 		console.log("STATUS: " + res.statusCode)
			// 		console.log("HEADERS: " + JSON.stringify(res.headers))
			// 	}

			// 	res.setEncoding("utf8")

			// 	let data = ""

			// 	res.on("data", chunk => {
			// 		data += chunk;
			// 	})

			// 	res.on("error", err => {
			// 		callCallback(err)
			// 	})

			// 	res.on("end", () => {
			// 		if (res.statusCode >= 400 && res.statusCode < 600 || res.statusCode < 10){
			// 			callCallback(new error.HttpError(data, res.statusCode, res.headers))
			// 		} else {
			// 			res.data = data
			// 			callCallback(null, res)
			// 		}
			// 	})
			// })

			// let timeout = (block.timeout !== undefined) ? block.timeout : self.config.timeout
			// if (timeout){
			// 	req.setTimeout(timeout)
			// }

			// req.on("error", function(e){
			// if (self.debug) console.log("problem with request: " + e.message)
			// 	callCallback(e.message)
			// })

			// req.on("timeout", function(){
			// if (self.debug) console.log("problem with request: timed out")
			// 	callCallback(new error.GatewayTimeout())
			// })

			// // write data to request body
			// if (hasBody && query.length){
			// if (self.debug) console.log("REQUEST BODY: " + query + "\n")
			// 	req.write(query + "\n")
			// }

			// if (block.hasFileBody) {
			// 	var stream = fs.createReadStream(msg.filePath)
			// 	stream.pipe(req)
			// } else {
			// 	req.end()
			// }
		}

		if (hasFileBody){
			fs.stat(msg.filePath, function(err, stat){
				if (err){
					callCallback(err)
				} else {
					headers["content-length"] = stat.size
					headers["content-type"] = mime.lookup(msg.name)
					httpSendRequest()
				}
			})
		} else {
			httpSendRequest()
		}
	}

}).call(wrapper.prototype)

export default wrapper
