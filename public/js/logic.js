console.log("logic.js successfully loaded");

/*
$(document).ready(function() {
  $('.dropdown-menu li > a').click(function(e){
    $('.btnStatus').text(this.innerHTML);
  });
});
*/

<script>
  $('#myStateButton').on('click', function () {
    $(this).button('complete') // button text will be "finished!"
  })
</script>
