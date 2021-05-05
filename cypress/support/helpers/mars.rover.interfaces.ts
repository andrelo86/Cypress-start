export interface IMarsRoverPhotosResponse {
    camera: ICameraData;
    earth_date: string;
    id: number;
    img_src: string;
    sol: number;
    rover: IRoverData;
}

interface ICameraData {
    id: number;
    full_name: string;
    name: string;
    rover_id: number;
}

interface IRoverData {
    id: number;
    landing_date: string;
    lauch_date: string;
    name: string;
    status: string;
}
