$(document).ready(function(){

	$('button#next-1').on('click',function(){
		$('#invoice-1').hide("slide", { direction: "left" }, 200);
		$('#invoice-2').show("slide", { direction: "right" }, 500);
		$('#progress-1').removeClass('active');
		$('#progress-2').addClass('active');
		return false;
	});

	$('button#next-2').on('click',function(){
		$('#invoice-2').hide("slide", { direction: "left" }, 200);
		$('#invoice-3').show("slide", { direction: "right" }, 500);
		$('#progress-2').removeClass('active');
		$('#progress-3').addClass('active');
		return false;
	});

	$('button#next-3').on('click',function(){
		$('#invoice-2').hide("slide", { direction: "right" }, 200);
		$('#invoice-1').show("slide", { direction: "left" }, 500);
		$('#progress-2').removeClass('active');
		$('#progress-1').addClass('active');
		return false;
	});

	$('button#next-4').on('click',function(){
		$('#invoice-3').hide("slide", { direction: "right" }, 200);
		$('#invoice-2').show("slide", { direction: "left" }, 500);
		$('#progress-3').removeClass('active');
		$('#progress-2').addClass('active');
		return false;
	});

	$('button#creat-invoice-open').on('click',function(){
		$('#invoices').hide("slide", { direction: "down" }, 500);
		$('#creat-invoice').show("slide", { direction: "up" }, 1000);
		$(this).hide();
		$('#creat-invoice-close').show();
		return false;
	});

	$('button#creat-invoice-close').on('click',function(){
		$('#creat-invoice').hide("slide", { direction: "up" }, 500);
		$('#invoices').show("slide", { direction: "down" }, 500);
		$(this).hide();
		$('#creat-invoice-open').show();
		return false;
	});
});