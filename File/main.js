const list_element = document.querySelector('.list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 6;

function DisplayList (items, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

	// let htmls = paginatedItems.map(function (item) {
	// 	return `
	// 		<div class="item" data-id="${item.id}">
	// 			<div class="data">${item.name}</div>
	// 			<div class="data">${item.age}</div>
	// 			<div class="data">${item.rank}</div>
	// 		</div>
	// 	`
	// })
	// wrapper.innerHTML = htmls.join('\n')

	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];

		let item_element = document.createElement('div');
		item_element.classList.add('item');
		item_element.setAttribute('data-id', item.userID);
		item_element.innerHTML = `
			<div class="data">${item.name}</div>
			<div class="data">${item.age}</div>
			<div class="data">${item.rank}</div>
		`;
		
		wrapper.appendChild(item_element);
	}
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		setTimeout(getID, 0)
		
		current_page = page;
		DisplayList(items, list_element, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

let defaultData
fetch('http://localhost:3000/dataUser')
	.then(function (response) {
		return response.json();
	})
	.then(function (response) {
		// console.log(response)
		DisplayList(response, list_element, rows, current_page);
		SetupPagination(response, pagination_element, rows);

		defaultData = response
	})

function getID() {
	let element = document.querySelectorAll('main .list .item')
	let elementID
	let pageIndex

	for (let i = 0; i < element.length; i++) {
		function eventDelete() {
			elementID = element[i].getAttribute('data-id')
	
			defaultData.forEach(function (item) {
				if (elementID == item.userID) {
					pageIndex = item.id
	
					fetch('http://localhost:3000/dataUser' + '/' + pageIndex, {
						method: 'DELETE',
						headers: { 'Content-Type': 'application/json'}
					})
						.then(() => {
							setTimeout(function () {
								location.reload()
							}, 3)
						})
				}
			})
		}
		element[i].addEventListener('click', eventDelete)
	}
}
getID()

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
