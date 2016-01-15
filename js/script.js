var $FD = jQuery.noConflict();

function check_passphrase() {
	if( $FD.sessionStorage.isSet('refresh') ) {
			$FD.sessionStorage.remove('refresh');
			$FD(".alert-info").removeClass("hideme");
	} else {
			$FD(".alert-info").addClass("hideme");
	}
  $FD("#open").click(function () {
		var hope_pwd = $FD("#password").val();
		var bitArray = sjcl.hash.sha256.hash(hope_pwd);  
		var digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
		if(digest_sha256 != $FD("#hash").text()) {
			$FD(".alert-danger").removeClass("hideme");
			setTimeout(function(){ $FD(".alert-danger").addClass("hideme"); }, 20000);
		}
		else {
			var passphrase = hope_pwd;

			$FD(".alert-success").removeClass("hideme");
			$FD(".alert-info").addClass("hideme");
			$FD(".alert-danger").addClass("hideme");	
			setTimeout(function(){ $FD(".alert-success").addClass("hideme"); }, 6000);
			var data_enc = $FD("#data").text();
			var data = sjcl.decrypt(passphrase, data_enc);
			//setInterval(function() { 
					$FD("#auth").addClass("hideme"); 
					$FD("#dec").html(data); 
					$FD("#notice").removeClass("hideme");
			//}, 2000);
					counter_clock();
		}
	});
}

function counter_clock() {
	var fiveSeconds = new Date().getTime() + 600000;

	 $FD('#clock').countdown(fiveSeconds, {elapse: true})
 	.on('update.countdown', function(event) {
   	var $this = $FD(this);
   	if (event.elapsed) {
     	//$this.html(event.strftime('After end: <span>%H:%M:%S</span>'));
			$FD.sessionStorage.set("refresh", "yes");
			location.reload();
   	} else {
     	$this.html(event.strftime('<span style="font-size:105%;" class="label label-default">Длина время, оставшееся до возобновление доступа является: <strong>%M:%S</strong></span>'));
   	}
 	});
}


function trigger_enter_submit() {	$FD(document).bind('keypress', function(e) { if(e.keyCode==13){ $FD('#open').trigger('click'); } }); }



$FD(document).ready(check_passphrase);
$FD(document).ready(trigger_enter_submit);
//$FD(document).ready(counter_clock);



