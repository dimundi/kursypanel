const helpersTabs = {
  
   handleCourseTabs: function(evt) {
    const TABS = [...document.querySelectorAll('.panel-tab-item')];
    /////
    TABS.forEach((tab) => {
      if (tab && tab.classList.contains('is-active')) {
        tab.classList.remove('is-active');
      }
    });
    evt.currentTarget.classList.add('is-active');
    /////
    const CONTENT = [...document.querySelectorAll('.panel-content')];
    CONTENT.forEach((item) => {
      if (item && item.classList.contains('is-active')) {
        item.classList.remove('is-active');
      }
      let data = item.getAttribute('id');
      let target = evt.currentTarget.getAttribute('data-target');
      if (data === target) {
        item.classList.add('is-active');   

      }
    });
  },

}

export default helpersTabs;