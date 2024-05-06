$(document).ready(function () {
    // Load API status when the page is loaded
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            // Add the class 'available' to div#api_status if status is OK
            $('#api_status').addClass('available');
        }
    });

    // Function to get filtered places
    function getFilteredPlaces() {
        var amenityIds = [];
        var stateIds = [];
        var cityIds = [];
        
        // Get amenity IDs
        $('input[type="checkbox"][data-type="amenity"]:checked').each(function() {
            amenityIds.push($(this).data('id'));
        });
        
        // Get state IDs
        $('input[type="checkbox"][data-type="state"]:checked').each(function() {
            stateIds.push($(this).data('id'));
        });

        // Get city IDs
        $('input[type="checkbox"][data-type="city"]:checked').each(function() {
            cityIds.push($(this).data('id'));
        });

        // Make POST request to places_search with filtered data
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: amenityIds,
                states: stateIds,
                cities: cityIds
            }),
            success: function (data) {
                // Clear existing places
                $('.places').empty();
                // Loop through the places data and create article tags
                data.forEach(function (place) {
                    var article = $('<article>');
                    article.append('<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div>');
                    article.append('<div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div></div>');
                    article.append('<div class="user"><strong>Owner: </strong></div>');
                    article.append('<div class="description">' + place.description + '</div>');
                    $('.places').append(article);
                });
            }
        });
    }

    // Listen for click event on button tag
    $('button').click(getFilteredPlaces);

    // Trigger filtered places on page load
    getFilteredPlaces();
});
