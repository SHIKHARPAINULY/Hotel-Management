angular.module('HotelApp' , ['720kb.datepicker']).component('buttonCtrl' , {
    restrict:'E',
    templateUrl:'button/button.component.html',
    bindings : {
        showRoom : '<'
    },
    controller : function ($scope , $rootScope) {
        $scope.ShowAvailableRooms = false;
        $scope.ShowOccupiedRooms = false;
        $scope.date = new Date().toLocaleDateString('en-GB');
        $scope.HotelRoomsArray = {
            OccupiedRoom : [
                {'roomNumber' : 'F1b', 'Date' : '11-02-2020'},
                {'roomNumber' : 'F1c', 'Date' : '4-02-2020'},
                
            ],
            AvailableRoom : [
                {'roomNumber' : 'F1a', 'Date' : 'NA'},
                {'roomNumber' :'F1e', 'Date' : 'NA'},
                {'roomNumber' : 'F2a' , 'Date' : 'NA'},
                {'roomNumber' : 'F2c', 'Date' : 'NA'},
                {'roomNumber' : 'F3b', 'Date' : 'NA'},
                {'roomNumber' : 'F3e', 'Date' : 'NA'},
                {'roomNumber' : 'F1d', 'Date' : 'NA'},
                {'roomNumber' : 'F2d', 'Date' : 'NA'},
                {'roomNumber' : 'F2e', 'Date' : 'NA'},
                {'roomNumber' : 'F3a', 'Date' : 'NA'},
             ]
        };

        $scope.showModal = function (val) {
            $scope.displayRooms = [];
            val == 'AR' ? ($scope.RoomSelection = 'AvailableRoom' , $scope.displayRooms = $scope.HotelRoomsArray.AvailableRoom , $scope.ShowAvailableRooms = true, $scope.ShowOccupiedRooms = false ) 
                        : ($scope.RoomSelection = 'OccupiedRoom' ,  $scope.displayRooms = $scope.HotelRoomsArray.OccupiedRoom ,  $scope.ShowOccupiedRooms = true , $scope.ShowAvailableRooms = false)  ; 
            $("#showModalBtn").click();

        },
        $scope.saveDate = function () {
            $scope.HotelRoomsArray.AvailableRoom.filter( Element => {
               if ( Element.roomNumber == $scope.RoomSelected ) {
                    Element.Date = $scope.date ;
                    return;
               }
            });
        },
        $scope.checkIn = function (val) {
            $scope.RoomSelected = JSON.parse(val);
            $("#showDateTimeModal").click();
        },
         $scope.checkOut = function (val) {
            $scope.RoomSelected = JSON.parse(val);
        },
        $scope.saveChange =  function () {
            if( $scope.RoomSelection  == 'AvailableRoom' ) {
                $scope.HotelRoomsArray.AvailableRoom =  $scope.HotelRoomsArray.AvailableRoom.filter(ele =>  ele.roomNumber != $scope.RoomSelected.roomNumber);
                $scope.RoomSelected.Date = $scope.date;
                console.log("the new value of date is being changed &  : " ,  $scope.RoomSelected);
                $scope.HotelRoomsArray.OccupiedRoom.push($scope.RoomSelected);
            }else if( $scope.RoomSelection  == 'OccupiedRoom' ) {
                $scope.HotelRoomsArray.OccupiedRoom = $scope.HotelRoomsArray.OccupiedRoom.filter( ele => ele.roomNumber != $scope.RoomSelected.roomNumber);
                $scope.HotelRoomsArray.AvailableRoom.push($scope.RoomSelected);
            }
        },
        $scope.$watch('HotelRoomsArray' , function(newVal, oldVal){
            if( newVal != oldVal) {
                $scope.HotelRoomsArray =  $scope.HotelRoomsArray;
            }

        }, true);
    }
});



