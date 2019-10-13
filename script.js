function setUp () {
	let searchButton = $('#searchButton')
	let nextButton = $('#nextButton')
	$(nextButton).hide()
	let list = $('#resultList')
	let apiurl = 'https://www.googleapis.com/youtube/v3/search'
	var nextPage
	var apiKey
	var searchText
	$(searchButton).on('click', (e) => {
		e.preventDefault()
		searchText = $('#searchText').val()
		apiKey = $('#apiKey').val()
		$.ajax({
			url: apiurl,
			data: {
				part: 'snippet',
				q: searchText,
				type: 'video',
				maxResults: 10,
				key: apiKey
			},
			method: 'GET',
			dataType: 'json',
			success: (responseJSON) => {
				console.log(responseJSON)
				list.html('')
				nextPage = responseJSON.nextPageToken
				for (let i = 0; i < responseJSON.items.length; i++) {
					list.append(`<li>
									<a href="https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
									  ${responseJSON.items[i].snippet.title}
									  <img src="${responseJSON.items[i].snippet.thumbnails.default.url}" alt="thumbnail">
									  </img>
									</a>
								</li>`)
				}

			},
			error: (err) => {
				console.log('oops')
			}
		})
		$(nextButton).show()
	})

	$(nextButton).on('click', (e) => {
		e.preventDefault()
		$.ajax({
			url: apiurl,
			data: {
				part: 'snippet',
				q: searchText,
				pageToken: nextPage,
				type: 'video',
				maxResults: 10,
				key: apiKey
			},
			method: 'GET',
			dataType: 'json',
			success: (responseJSON) => {
				console.log(responseJSON)
				nextPage = responseJSON.nextPageToken
				for (let i = 0; i < responseJSON.items.length; i++) {
					list.append(`<li>
									<a target="_blank" href="https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}">
									  ${responseJSON.items[i].snippet.title}
									  <img src="${responseJSON.items[i].snippet.thumbnails.default.url}" alt="thumbnail">
									  </img>
									</a>
								</li>`)
				}

			},
			error: (err) => {
				console.log('oops.next')
			}
		})
	})
}

console.log('onn')
setUp()