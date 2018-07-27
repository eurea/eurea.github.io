$(document).ready(function(){
	$("#search").on('click', function(){
		$('#results > tbody:last-child').html("<tr><td>Title</td><td>Character</td></tr>"); // reset table
		var userTitles = [];
		var pageCount = 1;
		var lastPage = false;
		$.getJSON('https://allorigins.me/get?url=' + encodeURIComponent($('#list').val() + "?c=all;v=0;t=-1;o=a;s=title;p=" + String(pageCount)) + '&callback=?', function(data){
		    console.log($('#list').val() + "?c=all;v=0;t=-1;o=a;s=title;p=" + String(pageCount));
		    pageCount = pageCount + 1;
		    var userPage = $("<div></div>");
			userPage.html(data.contents);
			userTable = $('table[class="stripe"]', userPage);
		    if ($('td[class="tc3_5"]', userTable) != null) { //check if there are still more entries
				$('td[class="tc3_5"]:has(a)', userTable).each(function(i, obj){
					userTitles.push($(this).text());
				});
		    } else {
		    	lastPage = true;
		    }		    
		});	
		

		$.getJSON('https://allorigins.me/get?url=' + encodeURIComponent($('#target').val()) + '&callback=?', function(data){
		    var allTables = $("<div></div>");
		    allTables.html(data.contents);
			charTable = $('table[class="stripe"]', allTables).last();
			$('td[class="tc1"]:has(a)', charTable).each(function(i, obj){
				if (userTitles.includes($(this).text())) {
					$('#results > tbody:last-child').append("<tr><td>" + $(this).html().replace("/", "https://vndb.org/") + "</td><td>" + $('td[class="tc3"]:has(a)', charTable).eq(i).html().replace("/", "https://vndb.org/") + "</td></tr>");
				}
			});
		});
	});
});


$(document).ready(function(){
	$("#search").on('click', function(){
		$('#results > tbody:last-child').html("<tr><td>Title</td><td>Character</td></tr>"); // reset table
		var userTitles = [];
		var pageCount = 1;
		var lastPage = false;
		function loopIt(){
			$.getJSON('https://allorigins.me/get?url=' + encodeURIComponent($('#list').val() + "?c=all;v=0;t=-1;o=a;s=title;p=" + String(pageCount)) + '&callback=?').then(function(data){
			    pageCount++;
			    var userPage = $("<div></div>");
			    userPage.html(data.contents);
			    userTable = $('table[class="stripe"]', userPage);
			    if ($('td[class="tc3_5"]', userTable) != null) { //check if there are still more entries
					$('td[class="tc3_5"]:has(a)', userTable).each(function(i, obj){
						userTitles.push($(this).text());
					});
					loopIt();
			    } 
			});
		}
		loopIt();

		$.getJSON('https://allorigins.me/get?url=' + encodeURIComponent($('#target').val()) + '&callback=?', function(data){
		    var allTables = $("<div></div>");
		    allTables.html(data.contents);
			charTable = $('table[class="stripe"]', allTables).last();
			$('td[class="tc1"]:has(a)', charTable).each(function(i, obj){
				if (userTitles.includes($(this).text())) {
					$('#results > tbody:last-child').append("<tr><td>" + $(this).html().replace("/", "https://vndb.org/") + "</td><td>" + $('td[class="tc3"]:has(a)', charTable).eq(i).html().replace("/", "https://vndb.org/") + "</td></tr>");
				}
			});
		});
	});
});


