angular.module('factoryService' , []).factory('dataService', function($rootScope ){
       HotelRoomsArray = {
            OccupiedRoom : [
                {'roomNumber' : 'F1b', 'Date' : '11-02-2020'},
                {'roomNumber' : 'F1c', 'Date' : '04-02-2020'},
                {'roomNumber' : 'F2d', 'Date' : '05-02-2020'},
                {'roomNumber' : 'F2e', 'Date' : '07-02-2020'},
                {'roomNumber' : 'F3a', 'Date' : '06-02-2020'},
                
            ],
            AvailableRoom : [
                {'roomNumber' : 'F1a', 'Date' : 'NA'},
                {'roomNumber' :'F1e', 'Date' : 'NA'},
                {'roomNumber' : 'F2a' , 'Date' : 'NA'},
                {'roomNumber' : 'F2c', 'Date' : 'NA'},
                {'roomNumber' : 'F3b', 'Date' : 'NA'},
                {'roomNumber' : 'F3e', 'Date' : 'NA'},
                {'roomNumber' : 'F1d', 'Date' : 'NA'},
             ]
        }
        return HotelRoomsArray;
});