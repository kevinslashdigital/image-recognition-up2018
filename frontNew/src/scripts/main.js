
const API_URL = "http://localhost:5000";
var formData = new FormData();

function set_preview_image(img){
  var imgTg = $("<img class='img-thumbnail' src=''/>")
  var reader = new FileReader();
  reader.onload = function(e){
    imgTg.attr("src", e.target.result)
    $(".img_review").children().remove()
    $(".img_review").append(imgTg)
    document.getElementById('drop').style.backgroundImage = 'url(' + e.target.result + ')';
  }
  reader.readAsDataURL(img);
}

function set_displ_img(img){
  $('#photo').val("")
  var reader = new FileReader();
  reader.onload = function(e){
    var dia = $("<div class='image_dia'></div>")
    dia.children().remove()
    var imgTg = $("<img id='img_crop' src=''/>")
    imgTg.attr("src", e.target.result)
    dia.append(imgTg)
    dia.append("<button id='rotator'>Rotate</button>")
   
    formData.delete("photo")
    formData.set("photo",img)
    $("#drop").css({"borderColor":"#1d9605"})
    // $( "#file" ).rules( "remove")
    // $("#file-error").remove()
    set_preview_image(img)
  };
  reader.readAsDataURL(img);



}
$(document).ready(function(){
//   let scroll = new SmoothScroll();
})

$(".upload_btn").on('click', function(e){
  e.preventDefault()
  $("#file").click()
})

$("#form_submit").bind('submit', function(e){
  e.preventDefault();
  // formData.set("email", e.target.email.value);
  // file_select_handler(formData)
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_URL}/classify`, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(formData);
  
})

$('#photo').bind('change',function(e){
  //file_select_handler(e.target.files[0]);
  //$('#fileupload').fileupload('add', {
  //  fileInput: $(this)
  //});
  console.log("on change")
  set_displ_img(e.target.files[0])
 //e.target.value = '';
});