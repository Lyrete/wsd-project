//define clickhandler for tabs
$('#navTabs a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})


//dumb code to check whether we want to focus on the evening form when coming to the page
//Morning form is shown on default so no need to check
if(window.location.href.split("#").pop() === "evening"){
  $('#nav-evening-tab').tab('show');
}

//Populating the date fields with current date (although this has tiny issue of being in UTC time so occasionally a day late)
$("#datePick").val(new Date().toISOString().substr(0, 10));
$("#datePick2").val(new Date().toISOString().substr(0, 10));
