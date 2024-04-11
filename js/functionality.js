/*START MOBILE COLLAPSE NAV*/
//let stateSelected = "default";
let result;

try {
    result = JSON.parse(localStorage.getItem("result"));
} catch (error) {
    console.error(error);

}



let parkHTML = "";

function toggleMobileNav() {
    const collapseList = ["show", "animated", "fadeIn"];
    const navElem = document.getElementById("collapsingNav");
    try {
        if (document.querySelector(".navbar-collapse.show").length) {
            /*WHEN THIS ELEMENT DOES NOT EXIST THE CATCH ERROR WILL CREATE IT*/
        } else {
            for (let i = 0; i < collapseList.length; i++) {
                navElem.classList.remove(collapseList[i]);
            }
        }
    } catch (error) {
        for (let i = 0; i < collapseList.length; i++) {
            navElem.classList.add(collapseList[i]);
        }
    }
}
let stateListHTML = "<option value='default'>Select a State</option>";
for (let i = 0; i < localData[0].usStates.length; i++) {
    stateListHTML = stateListHTML + "<option value='" + localData[0].usStates[i] + "'>" + localData[0].usStates[i] + "</option>";
}
[].forEach.call(document.querySelectorAll("select.stateList"), (e) => {
    e.innerHTML = stateListHTML;
});


function viewImage(cardNum, imgNum) {
    if (document.querySelector("img[data-id='" + imgNum + "']")) {
        document.querySelector("div.card[data-id='" + cardNum + "'] img.card-img-top").setAttribute("src", result[cardNum].images[imgNum].url);
        [].forEach.call(document.querySelectorAll("img[data-id]"), (e) => {
            e.classList.remove("active");
        });
        document.querySelector("img[data-id='" + imgNum + "']").classList.add("active");
    }

}


/*START GET PARK LIST*/
function selectPark(chosenPark) {
    let imagesHTML = "";
    parkHTML = "";
    let contactHTML = "";
    let activitiesHTML = "";
    document.getElementById("parkInfoTarget").innerHTML = "";

    try {
        for (let j = 0; j < result[chosenPark].images.length; j++) {/*GATHER ALL IMAGES IN ARRAY*/
            let firstActive = "";
            if (j === 0) {
                firstActive = " active";
            }

            imagesHTML = imagesHTML
                + "<div class='col d-flex justify-content-center'><img data-id='" + j + "' src=" + result[chosenPark].images[j].url
                + " class='img-thumbnail pointer " + firstActive + "' onClick='viewImage(" + chosenPark + "," + j + ")' alt='"
                + result[chosenPark].images[j].altText + "'  title='"
                + result[chosenPark].images[j].title
                + " credit: " + result[chosenPark].images[j].credit + "' /></div>";
        }
    } catch (error) {
        console.error(error);
    }







    for (let j = 0; j < result[chosenPark].addresses.length; j++) {/*GATHER ALL ADDRESSES IN ARRAY*/
        if (j === 0 || result[chosenPark].addresses[j].line3 !== result[chosenPark].addresses[j - 1].line3) {
            contactHTML = contactHTML
                + "<li><ul class='list-unstyled'><li>" + result[chosenPark].addresses[j].line1 + "</li><li>" + result[chosenPark].addresses[j].line2 + "</li><li>" + result[chosenPark].addresses[j].line3
                + "</li><li>" + result[chosenPark].addresses[j].city + ", " + result[chosenPark].addresses[j].stateCode + " " + result[chosenPark].addresses[j].postalCode + "</li></ul>";
        }

    }


    for (let j = 0; j < result[chosenPark].activities.length; j++) {/*GATHER ALL ACTIVITIES IN ARRAY*/
        if (j === 0) {
            activitiesHTML = "Activities: ";
        }
        activitiesHTML = activitiesHTML + "<span class='badge text-bg-secondary'>" + result[chosenPark].activities[j].name + "</span>";
    }

    /*GATHER ALL COLLECTED STRINGS FROM OUR FOR LOOPS AND BUILD OUR MAIN STAGE HTML (#parkInfoTarget)*/
    parkHTML = parkHTML + "<div class='card ' data-id='" + chosenPark + "'><div class='card-body'><h5 class='card-title'>" + result[chosenPark].fullName
        + ", " + result[chosenPark].addresses[0].stateCode + "</h5><ul class='list-unstyled'><li><div class='row thumbNailRow' >" + imagesHTML
        + "</div></li><li><img src='" + result[chosenPark].images[0].url
        + "' class='card-img-top' alt='" + result[chosenPark].images[0].credit
        + "'/></li><li><hr/><p>" + result[chosenPark].description
        + "</p><p>" + result[chosenPark].operatingHours[0].description + "</p>" + activitiesHTML + "</p><p>" + result[chosenPark].directionsInfo
        + ": <a href='" + result[chosenPark].directionsUrl
        + "'  target='_blank'>Directions Link</a></p></li><li><div id='MapTarget'></div></li><li><ul class='list-unstyled' id='contactTarget'></ul></li><li>Email: <a href='mailto:" +
        result[chosenPark].contacts.emailAddresses[0].emailAddress + "'> " + result[chosenPark].contacts.emailAddresses[0].emailAddress
        + "</a></li><li>Website: <a href='" + result[chosenPark].url + "' target='_blank'>" +
        result[chosenPark].url + "</a></li><li class='text-secondary'><small><i>Weather Info: " +
        result[chosenPark].weatherInfo + "</i></small></li></ul></div></div>";

    document.getElementById("parkInfoTarget").innerHTML = parkHTML;
    /*ONCE #parkInfoTarget IS BUILT #MapTarget, #contactTarget EXIST, NOT BEFORE*/
    document.getElementById("MapTarget").innerHTML = "<iframe  src='https://www.google.com/maps/embed/v1/place?key=" + account[0].MapInfo
        + "&amp;q=" + result[chosenPark].latitude + "," + result[chosenPark].longitude + "&zoom=9' allowfullscreen=''></iframe>";
    document.getElementById("contactTarget").innerHTML = contactHTML;

    if (document.querySelector(".list-group-item[data-id]")) {
        if (document.querySelector(".list-group-item[data-id='" + chosenPark + "']")) {
            [].forEach.call(document.querySelectorAll(".list-group-item[data-id]"), (e) => {
                e.classList.remove("active")
            });
            document.querySelector(".list-group-item[data-id='" + chosenPark + "']").classList.add("active");
        }
    }


}

function buildList(data, stateSelected) {

    optionListHTML = "";
    let postFirst = false;

    for (let i = 0; i < data.length; i++) {
        if (data[i].addresses[0].stateCode == stateSelected) {
            let firstActive = "";
            if (i === 0) {
                firstActive = " active";
            }

            optionListHTML = optionListHTML
                + `<a href='#' class='list-group-item list-group-item-action ${firstActive}' data-id='${i}' onclick='selectPark(${parseInt(i)}) '><div class='row'><div class='col-md-3'><img class='img-thumbnail ' src='
                ${data[i].images[0].url}' alt='${data[i].images[0].credit}'  title='${data[i].images[0].title + " credit: " + data[i].images[0].credit}'/></div><div class='col-md-9'><h6>${data[i].fullName}</h6><p>${data[i].description.substring(0, 100)}...</p></div></div></a>`;
            if (postFirst === false) {
                selectPark(i);
                postFirst = true;
            }
        }
    }
    document.getElementById("optionList").innerHTML = optionListHTML;
}

/* START HERE WITH API CALL TO developer.nps.gov*/
async function getParkList(firstRun) {
    stateSelected = document.getElementById("stateSelected").value;
    let randomNum = Math.floor(Math.random() * localData[0].usStates.length);
    if (stateSelected === "default") {
        if (firstRun === true) {
            if (localStorage.getItem("result") && localStorage.getItem("stateSelected")) {

                document.getElementById("stateSelected").selectedIndex = localData[0].usStates.indexOf(localStorage.getItem("stateSelected")) + 1;
                buildList(JSON.parse(localStorage.getItem("result")), localStorage.getItem("stateSelected"));



                return false;

            }
            stateSelected = localData[0].usStates[randomNum];
            document.getElementById("stateSelected").selectedIndex = randomNum + 1;
        } else {
            return false;
        }

    }


    if (stateSelected.length == 2) {

        try {
            const response = await fetch("https://developer.nps.gov/api/v1/parks?stateCode=" + stateSelected + "&limit=600&api_key=" + account[0].npsKey);

            result = await response.json();

            if (response.status > 399 && response.status < 500) {
                globalAlert("alert-danger", "You might need an API key for the\"accountData.js\" file in the \"config\" folder.");

            }

            result = result.data;
            localStorage.setItem("result", JSON.stringify(result));
            localStorage.setItem("stateSelected", stateSelected);

            buildList(result, stateSelected);

            if (optionListHTML.length === 0) {
                globalAlert("alert-warning", "No results for " + stateSelected);
                return false;
            }

        } catch (error) {
            console.log("Error: " + error);
            buildList(JSON.parse(localStorage.getItem("result")), localStorage.getItem("stateSelected"));
            return false;
        }
    } else {
        console.log("No state selected");
        return false;
    }
}

getParkList(true);
/*
{
            "id": "F2A0D649-ED66-4BB7-A3EC-001CC42921CF",
            "url": "https://www.nps.gov/buov/index.htm",
            "fullName": "Butterfield Overland National Historic Trail",
            "parkCode": "buov",
            "description": "In 1857, businessman and transportation entrepreneur John Butterfield was awarded a contract to establish an overland mail route between the eastern United States and growing populations in the Far West. What became known as the Butterfield Overland Trail made an arcing sweep across the southern rim of the country. Stagecoaches left twice a week carrying passengers, freight, and mail.",
            "latitude": "32.2768237589",
            "longitude": "-106.796583304",
            "latLong": "lat:32.2768237589, long:-106.796583304",
            "activities": [],
            "topics": [],
            "states": "MO,AR,OK,TX,NM,AZ,CA",
            "contacts": {
                "phoneNumbers": [],
                "emailAddresses": [
                    {
                        "description": "",
                        "emailAddress": "ntir_information@nps.gov"
                    }
                ]
            },
            "entranceFees": [],
            "entrancePasses": [],
            "fees": [],
            "directionsInfo": "Those portions of the Butterfield Overland National Historic Trail authorized by Congress include nearly 3,300 miles of historic trail.",
            "directionsUrl": "http://www.nps.gov/buov/planyourvisit/directions.htm",
            "operatingHours": [
                {
                    "exceptions": [],
                    "description": "The Butterfield Overland National Historic Trail is not a clearly marked hiking trail. Instead, it is a corridor that passes through communities, urban areas, public lands, and Wilderness. The route travels across a variety of land ownerships and management, including private land. Each location varies as to the hours of operation and access. Please contact individual trail sites before your visit for more information.",
                    "standardHours": {
                        "wednesday": "All Day",
                        "monday": "All Day",
                        "thursday": "All Day",
                        "sunday": "All Day",
                        "tuesday": "All Day",
                        "friday": "All Day",
                        "saturday": "All Day"
                    },
                    "name": "Butterfield Overland National Historic Trail"
                }
            ],
            "addresses": [
                {
                    "postalCode": "87505",
                    "city": "Santa Fe",
                    "stateCode": "NM",
                    "countryCode": "US",
                    "provinceTerritoryCode": "",
                    "line1": "National Trails Office Regions 6|7|8",
                    "type": "Physical",
                    "line3": "1100 Old Santa Fe Trail",
                    "line2": "Butterfield Overland National Historic Trail"
                },
                {
                    "postalCode": "87505",
                    "city": "Santa Fe",
                    "stateCode": "NM",
                    "countryCode": "US",
                    "provinceTerritoryCode": "",
                    "line1": "National Trails Office Regions 6|7|8",
                    "type": "Mailing",
                    "line3": "1100 Old Santa Fe Trail",
                    "line2": "Butterfield Overland National Historic Trail"
                }
            ],
            "images": [
                {
                    "credit": "NPS Photo",
                    "title": "Presidio Chapel of San Elizario",
                    "altText": "A large white building with a cross and bell on the roof above the front door.",
                    "caption": "A site along the Butterfield Overland National Historic Trail",
                    "url": "https://www.nps.gov/common/uploads/structured_data/2E63503E-EA59-49AC-82C14F2EC0C43711.jpg"
                },
                {
                    "credit": "NPS Photo",
                    "title": "Presidio Chapel of San Elizario",
                    "altText": "A large white building with a cross and bell on the roof above the front door.",
                    "caption": "A site along the Butterfield Overland National Historic Trail",
                    "url": "https://www.nps.gov/common/uploads/structured_data/2E63503E-EA59-49AC-82C14F2EC0C43711.jpg"
                }
            ],
            "weatherInfo": "Due to the length of the trail, be sure to consult local weather sources for the region you'll be visiting. Check out the forecast with the National Weather Service and search for the area you'd like to visit: weather.gov",
            "name": "Butterfield Overland",
            "designation": "National Historic Trail",
            "relevanceScore": 1.0
        },
*/

