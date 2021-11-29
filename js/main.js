$(function () {
    const bikesWrapper = $('.bikesWrapper'),
        filterItems = $('.filter-items');

    $.get('https://json-project3.herokuapp.com/products', function (bikes) {
        //function to render the bikes
        const renderBikes = arr => {
            arr.forEach(bike => {
                bikesWrapper.append(`
					<div class="col-4 mb-4">
						<div class="card h-100">
							<div class="img-wrapper text-center">
								<img src="./img/${bike.image}.png" class="p-3" alt="bikes"/>
							</div>   
							<div class="card-body">
								<h5 class="card-title font-weight-bold h6">${bike.name}</h5>
								<span class="card-text">${bike.price} $</span>
							</div>
						</div>
					</div>
				`);
            });
        };

        //functions for filter the bikes and render the number of filtered bikes
        const filterGender = query =>
                bikes.filter(bike => bike.gender === query),
            filterBrand = query => bikes.filter(bike => bike.brand === query),
            renderNum = (el, arr) => $(el).text(arr.length);

        //render all the bikes on page load
        renderBikes(bikes);

        //render the number of filtered bikes
        renderNum('.showAll', bikes);
        renderNum('.male', filterGender('MALE'));
        renderNum('.female', filterGender('FEMALE'));
        renderNum('.grand', filterBrand('LE GRAND BIKES'));
        renderNum('.kross', filterBrand('KROSS'));
        renderNum('.explorer', filterBrand('EXPLORER'));
        renderNum('.visitor', filterBrand('VISITOR'));
        renderNum('.pony', filterBrand('PONY'));
        renderNum('.force', filterBrand('FORCE'));
        renderNum('.eBikes', filterBrand('E-BIKES'));
        renderNum('.ideal', filterBrand('IDEAL'));

        //on click add the active class and render the filtered bikes
        filterItems.on('click', function () {
            let $this = $(this);
            const query = $this.find('span:first').text().toUpperCase();

            filterItems.removeClass('active');
            $this.addClass('active');

            bikesWrapper.html('');

            if (query === 'MALE' || query === 'FEMALE')
                filterArr = filterGender(query);
            else filterArr = filterBrand(query);

            renderBikes(filterArr);

            if (query === 'SHOW ALL') {
                bikesWrapper.html('');
                renderBikes(bikes);
            }
        });
    });
});
