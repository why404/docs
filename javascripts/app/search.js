!function(e){function t(){$("h1, h2").each(function(){var e=$(this),t=e.nextUntil("h1, h2");u.add({id:e.prop("id"),title:e.text(),body:t.text()})})}function i(){a=$(".content"),h=$(".dark-box"),s=$(".search-results"),$("#input-search").on("keyup",n)}function n(e){if(l(),s.addClass("visible"),27===e.keyCode&&(this.value=""),this.value){var t=u.search(this.value).filter(function(e){return e.score>1e-4});t.length?(s.empty(),$.each(t,function(e,t){s.append("<li><a href='#"+t.ref+"'>"+$("#"+t.ref).text()+"</a></li>")}),r.call(this)):s.html('<li>\u5bf9\u4e0d\u8d77\uff0c\u6ca1\u6709\u627e\u5230\u4e0e "'+this.value+'" \u76f8\u5173\u5185\u5bb9</li>')}else l(),s.removeClass("visible")}function r(){this.value&&a.highlight(this.value,c)}function l(){a.unhighlight(c)}var a,h,s,c=($(e),{element:"span",className:"search-highlight"}),u=new lunr.Index;u.ref("id"),u.field("title",{boost:10}),u.field("body"),u.pipeline.add(lunr.trimmer,lunr.stopWordFilter),$(t),$(i)}(window);