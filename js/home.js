
$(".openNav").click(function () {
  $("#leftMenu").animate({ width: '250px' }, 50)
  $("#home-content").animate({ marginLeft: '250px' }, 50)

})

$(".closebtn").click(function () {
  $("#leftMenu").animate({ width: '0px' }, 50)
  $("#home-content").animate({ marginLeft: '0px' }, 50)

});





// API



const displayNews = function (items) {
  $('#home-content').html('');
 
    items.forEach((element,index) => {
      if (element.title === "[Removed]") return;      
      const html = `<div class="col-lg-3 col-md-4 col-sm-6 ">
        <div class="text-center img-container">
          <img src=${element.urlToImage} class="item-img m-5 img-fluid">
        </div>
        <div class="item-info ">
          <h5 class="item-title p-3">${element.title}</h5>
          <h5 class="item-price p-3 text-danger">${element.description ? element.description.substring(0, 50) + (element.description.length > 50 ? '...' : '') : element.title }</h5>
        </div>
      </div>`;
      $('#home-content').append(html);
    });

};





const getAllNews = async function (key = '97c84e0b6d62447eb621aded4d259682') {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`);
    const data = await response.json() ;
    console.log(data.articles );
    await displayNews(data.articles)
  } catch (error) {
    console.error(error);
  }

}
getAllNews() ; 

const getCatogryNews = async function (key = '97c84e0b6d62447eb621aded4d259682' , catogry) {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${catogry}&apiKey=${key}`);
    const data = await response.json() ;
    console.log(data.articles );
    await displayNews(data.articles)
  } catch (error) {
    console.error(error);
  }

}


// const cat = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=97c84e0b6d62447eb621aded4d259682`

$('.catogry').click(function (e) { 
  e.preventDefault();
  
  const category = $(this).attr('href')
  getCatogryNews(undefined , category)

  
});



$('#logout').click(function(e) {
  e.preventDefault();

  Swal.fire({
    title: 'Logout',
    text: 'Are you sure you want to log out?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, log out',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'custom-alert',
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-alert',
          title: 'custom-title',
          content: 'custom-content',
          confirmButton: 'custom-confirm-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "index.html";
      
        }
      });
    }
  });
});






