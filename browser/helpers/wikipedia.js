var wikipedia = function() {

	return {

		getLanguage: function() {
			if (lastfm.getLanguage()) {
				return lastfm.getLanguage();
			} else {
				return "en";
			}
		},

		search: function(terms, successCallback, failCallback) {
			var url = "browser/backends/info_wikipedia.php?";
			for (var i in terms) {
				url = url + i+'='+encodeURIComponent(terms[i])+"&";
			}
			url = url + "lang="+wikipedia.getLanguage()+"&layout="+skin;
		    $.ajax({
		        type: "GET",
		        url: url,
		        dataType: "xml",
		        success: successCallback,
		        error: failCallback
		    });
		},

		getFullUri: function(terms, successCallback, failCallback) {
			var url = "browser/backends/info_wikipedia.php?";
			for (var i in terms) {
				url = url + i+'='+encodeURIComponent(terms[i])+"&";
			}
			url = url + "lang="+wikipedia.getLanguage()+"&layout="+skin;
		    $.ajax({
		        type: "GET",
		        url: url,
		        dataType: "xml",
				success: successCallback,
		        error: failCallback
		    });
		},

		wikiMediaPopup: function(element, event) {
			var thing = element.attr("name");
			debug.log("WIKIPEDIA","Clicked element has name",thing);
			var a = thing.match(/(.*?)\/(.*)/);
			if (a && a[1] && a[2]) {
				var fname = a[2];
				if (fname.match(/jpg$/i) || fname.match(/gif$/i) || fname.match(/png$/i) || fname.match(/jpeg$/i) || fname.match(/svg$/i) || fname.match(/bmp$/i)) {
		        	imagePopup.create(element, event);
				    var url = "http://"+a[1]+"/w/api.php?action=query&iiprop=url|size&prop=imageinfo&titles=" + a[2] + "&format=json&callback=?";
				    $.getJSON(url, function(data) {
				        $.each(data.query.pages, function(index, value) {
				        	imagePopup.create(element, event, 'getRemoteImage.php?url='+value.imageinfo[0].url);
				        	return false;
				        });
				    }).fail( function() { imagePopup.close() });
				}
			}
		    return false;
		},

		getWiki: function(link, successCallback, failCallback) {
			$("#infopane").css({cursor:'wait'});
			$("#infopane a").css({cursor:'wait'});
			var url = "browser/backends/info_wikipedia.php?wiki="+link+"&layout="+skin;
		    $.ajax({
		        type: "GET",
		        url: url,
		        dataType: "xml",
				success: successCallback,
		        error: failCallback,
		        complete: function() {
					$("#infopane").css({cursor:'auto'});
					$("#infopane a").css({cursor:'auto'});
		        }
		    });
		},
	}

}();
