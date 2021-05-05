import { IMarsRoverPhotosResponse } from './mars.rover.interfaces';

/**
 * Get Photos by Mars Sol
 * @param   cameraGroup to retrieve photos
 * @param   solNumber to get photos
 * @returns photos by the mars sol
 */
function getPhotosByMarsSol(cameraGroup: string, solNumber: number): Cypress.Chainable<IMarsRoverPhotosResponse[]> {
    return cy
        .request(
            `${Cypress.config().baseUrl}${cameraGroup}${Cypress.env('PHOTOS')}sol=${solNumber}=&api_key=${Cypress.env(
                'API_KEY'
            )}`
        )
        .then((resp) => {
            return resp.body.photos as IMarsRoverPhotosResponse[];
        });
}

/**
 * Get Photos by Earth Day
 * @param   cameraGroup to retrieve photos
 * @param   earthDay to get photos
 * @returns photos by the mars sol
 */
function getPhotosByEarthDay(cameraGroup: string, earthDay: string): Cypress.Chainable<IMarsRoverPhotosResponse[]> {
    return cy
        .request(
            `${Cypress.config().baseUrl}${cameraGroup}${Cypress.env(
                'PHOTOS'
            )}earth_date=${earthDay}=&api_key=${Cypress.env('API_KEY')}`
        )
        .then((resp) => {
            return resp.body.photos as IMarsRoverPhotosResponse[];
        });
}

/**
 * Get Photos by Mars sol with camera and camera group
 * @param   cameraGroup to retrieve photos
 * @param   earthDay to get photos
 * @returns photos by the mars sol
 */
function getPhotosByMarsDayWithCameraGroupAndCamera(
    cameraGroup: string,
    camera: string,
    solNumber: number
): Cypress.Chainable<IMarsRoverPhotosResponse[]> {
    return cy
        .request(
            `${Cypress.config().baseUrl}${cameraGroup}${Cypress.env(
                'PHOTOS'
            )}sol=${solNumber}&camera=${camera}&api_key=${Cypress.env('API_KEY')}`
        )
        .then((resp) => {
            return resp.body.photos as IMarsRoverPhotosResponse[];
        });
}

export default {
    getPhotosByMarsSol,
    getPhotosByEarthDay,
    getPhotosByMarsDayWithCameraGroupAndCamera,
};
