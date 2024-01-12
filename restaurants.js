//Created a constant to refer to my URL/API endpoint.

const API_ENDPOINT = "https://6597777c668d248edf22df89.mockapi.io/Restaurants/";

//For GETTING the data I am displaying it in bootstrap-styled cards. In the template literals I am calling on the data for each restaurant, including ID, image, restaurant name, and restaurant cuisine depending on what I want to display.

$.get(API_ENDPOINT).then((data) => {
  data.map((restaurants) => {
    $("#restaurantListDiv").append(
      `<div class="col">
         <div class="card mb-3" style="max-width: 600px;">
           <div class="row g-0">
              <div class="col-md-4">
            <img
              src="${restaurants.img}"
              alt="${restaurants.restaurantName}"
              class="img-fluid rounded-start"
            />
            <h6>Restaurant ID: ${restaurants.id}</h6>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title" id="greenCardTitle">${restaurants.restaurantName}</h5>
              <p class="card-text">
              <strong>Cuisine:</strong> ${restaurants.cuisine}<br><br>
              <button class='btn btn-dark' onClick='deleteRestaurant(${restaurants.id})'>Delete</button>
              </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>`
    );
  });
});

//This is for the Create New Restaurant button which enables user to POST the data / create a new restaurant with what they put in the form. I retrieved the values/text from the form with each form tag and then .val(). At the end of all of my functions that involve clicking a button I use the location.reload to refresh the page and display the newly accuraet data.

document
  .querySelector("#create-new-restaurant")
  .addEventListener("click", function () {
    $.post(API_ENDPOINT, {
      restaurantName: $("#newRestaurantName").val(),
      cuisine: $("#newCuisine").val(),
      img: $("#newImageURL").val(),
    }).done(function () {
      location.reload();
    });
  });

//For DELETE ajax has a delete method that makes it simple & I referenced the API Endpoint URL and then a template literal to call the ID of whichever restaurant its tied to. Afterwards I have it refresh the page so that the deleted item will disappear.

function deleteRestaurant(id) {
  console.log(id);
  return $.ajax({
    url: API_ENDPOINT + id,
    method: "DELETE",
  }).done(function () {
    location.reload();
  });
}

//To PUT or update the info of a currently / already created restaurant, I did a similar configuration as the create, just coming from different form boxes and using the ajax PUT method. I made the id variable to refer to the specific restaurant ID, making the template literal easy.

function updateRestaurant() {
  let id = $("#updateID").val();
  $.ajax(API_ENDPOINT + id, {
    method: "PUT",
    data: {
      restaurantName: $("#updateName").val(),
      cuisine: $("#updateCuisine").val(),
      img: $("#updateImageURL").val(),
    },
  }).done(function () {
    location.reload();
  });
}

//This last part makes it so that when you click on the update button, it refers to the proper update function that we just went through above.

$("#update-restaurant").on("click", updateRestaurant);
