import { curiosityCameras } from "../../support/helpers/mars.rover.constants";
import marsRoverHelpers from "../../support/helpers/mars.rover.helpers";

describe('API CURIOSITY TESTS', () => {
    it('Retrieve the first 10 Mars photos made by "Curiosity" on 1000 Martian sol', () => {
        // Get Photos by mars sol
        marsRoverHelpers.getPhotosByMarsSol(Cypress.env('CURIOSITY'), 1000).then((marsSolPhotos) => {
            // Filter first ten photos
            const firstTenPhotos = marsSolPhotos.slice(0, 10).map((photo, index) => {
                return `Photo Number: ${index + 1} - Source: ${photo.img_src}`;
            });
            // Check that array has ten photos
            cy.wrap(firstTenPhotos).should('have.length', 10);
            Cypress._.each(firstTenPhotos, (photo) => {
                // Log Each photo src
                cy.log(photo);
            });
        });
    });

    it('Retrieve the first 10 Mars photos made by "Curiosity" on Earth date equal to 1000 Martian sol', () => {
        // Get earth date from martian date
        marsRoverHelpers.getPhotosByMarsSol(Cypress.env('CURIOSITY'), 1000).then((marsSolPhotos) => {
            const earthDate = marsSolPhotos[0].earth_date;
            // Get photos by earth day
            marsRoverHelpers.getPhotosByEarthDay(Cypress.env('CURIOSITY'), earthDate).then((earthDayPhotos) => {
                // Filter first ten photos
                const firstTenPhotos = earthDayPhotos.slice(0, 10).map((photo, index) => {
                    return `Photo Number: ${index + 1} - Source: ${photo.img_src}`;
                });
                // Check that array has ten photos
                cy.wrap(firstTenPhotos).should('have.length', 10);
                Cypress._.each(firstTenPhotos, (photo) => {
                    // Log Each photo src
                    cy.log(photo);
                });
            });
        });
    });

    it('Retrieve and compare the first 10 Mars photos made by "Curiosity" on 1000 sol and on Earth date equal to 1000 Martian sol.', () => {
        // Get Photos by martin sol
        marsRoverHelpers.getPhotosByMarsSol(Cypress.env('CURIOSITY'), 1000).then((marsSolPhotos) => {
            const earthDate = marsSolPhotos[0].earth_date;
            // Get photos by earth day
            marsRoverHelpers.getPhotosByEarthDay(Cypress.env('CURIOSITY'), earthDate).then((earthDayPhotos) => {
                // Compare that both arrays are equal
                cy.wrap(marsSolPhotos).should('deep.equal', earthDayPhotos);
            });
        });
    });

    // Note this test is skipped because camera MAST has more than 10 times the amout of pictures than other cameras
    it.skip('Validate that the amounts of pictures that each "Curiosity" camera took on 1000 Mars sol is not greater than 10 times the amount taken by other cameras on the same date.', () => {
        // Get Photos by of each curiosity camera
        Cypress._.each(curiosityCameras, (curiosityCamera) => {
            marsRoverHelpers
                .getPhotosByMarsDayWithCameraGroupAndCamera(Cypress.env('CURIOSITY'), curiosityCamera, 1000)
                .then((marsSolPhotosCuriosity) => {
                    // Get pictures of oppotunity
                    marsRoverHelpers
                        .getPhotosByMarsSol(Cypress.env('OPPORTUNITY'), 1000)
                        .then((marsSolPhotosOpportunity) => {
                            // Get pictures of Spirit
                            marsRoverHelpers
                                .getPhotosByMarsSol(Cypress.env('SPIRIT'), 1000)
                                .then((marsSolPhotosSpirit) => {
                                    const otherCameras = marsSolPhotosOpportunity.length + marsSolPhotosSpirit.length;
                                    cy.log(`Curiosity camera: ${curiosityCamera}`);
                                    cy.wrap(marsSolPhotosCuriosity.length).should(
                                        'not.be.greaterThan',
                                        otherCameras * 10
                                    );
                                });
                        });
                });
        });
    });
});
