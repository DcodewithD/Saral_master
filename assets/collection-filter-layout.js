$('.collection-sidebar-filter-headings').each((ind,el)=>{
  $(el).on('click',function(){
    let btn = el;
    $('.collection-sidebar-filter-headings').each((ind,el)=>{
        el != btn ? el.classList.remove('active') : el.classList.add('active');
    })
    $('.collection-sidebar-section').each((ind,el) =>{
      el.dataset.filter == btn.dataset.filter ? el.classList.add('active') : el.classList.remove('active');
      setTimeout(()=>{
        el.dataset.filter == btn.dataset.filter ?   el.style.opacity = '1' :  el.style.opacity = '0';  
      },0)
    })
  })
})

$('.clear-all-btn').on('click',function(){
  $('.collection-current-filters__clear a span')[0] ? $('.collection-current-filters__clear a span').click() : '';  
})