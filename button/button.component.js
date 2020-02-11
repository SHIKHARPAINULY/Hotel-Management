angular.module('HotelApp' , ['720kb.datepicker']).component('buttonCtrl' , {
    restrict:'E',
    templateUrl:'button/button.component.html',
    bindings : {
        showRoom : '<'
    },
    controller : function ($scope , $rootScope , mainFac) {
        console.log('the buttonCtrl controller executed' , mainFac);
        $scope.ShowAvailableRooms = false;
        $scope.ShowOccupiedRooms = false;
        $scope.date = new Date().toLocaleDateString('en-GB');
        $scope.showModal = function (val) {
            $scope.displayRooms = [];
            val == 'AR' ? ($scope.RoomSelection = 'AvailableRoom' , $scope.displayRooms = mainFac.AvailableRoom , $scope.ShowAvailableRooms = true, $scope.ShowOccupiedRooms = false ) 
                        : ($scope.RoomSelection = 'OccupiedRoom' ,  $scope.displayRooms = mainFac.OccupiedRoom ,  $scope.ShowOccupiedRooms = true , $scope.ShowAvailableRooms = false)  ; 
            $("#showModalBtn").click();
        },
        $scope.saveDate = function () {
            mainFac.AvailableRoom.filter( Element => {
               if ( Element.roomNumber == $scope.RoomSelected.roomNumber ) {
                    Element.Date = $scope.date ;
                    return;
               }
            });
        },
        $scope.checkIn = function (val) {
            if( $scope.RoomSelected == undefined || $scope.RoomSelected == '' ) {
                $scope.RoomSelected = JSON.parse(val);
                $("#showDateTimeModal").click();
            } else {  
                $("#OneAtATimeModal").click();
            }
        },
         $scope.checkOut = function (val) {
            if( $scope.RoomSelected == undefined || $scope.RoomSelected == '' ) {
                $scope.RoomSelected = JSON.parse(val);
                // $("#showDateTimeModal").click();
            } else {  
                $("#OneAtATimeModal").click();
            }
        },
        $scope.saveChange =  function () {
            if( $scope.RoomSelection  == 'AvailableRoom' ) {
                mainFac.AvailableRoom =  mainFac.AvailableRoom.filter(ele =>  ele.roomNumber != $scope.RoomSelected.roomNumber);
                $scope.RoomSelected.Date = $scope.date;
                mainFac.OccupiedRoom.push($scope.RoomSelected);
                $scope.RoomSelected = '';
            }else if( $scope.RoomSelection  == 'OccupiedRoom' ) {
                mainFac.OccupiedRoom = mainFac.OccupiedRoom.filter( ele => ele.roomNumber != $scope.RoomSelected.roomNumber);
                $scope.RoomSelected.Date = 'NA';
                mainFac.AvailableRoom.push($scope.RoomSelected);
                $scope.RoomSelected = '';
            }
        },
        $scope.$watch('HotelRoomsArray' , function(newVal, oldVal){
            if( newVal != oldVal) {
                mainFac =  mainFac;
            }

        }, true);
        $scope.Undo = function(val) {
            $scope.RoomSelected = JSON.parse(val);
            mainFac.AvailableRoom.filter(ele =>  {
                if(ele.roomNumber == $scope.RoomSelected.roomNumber ) {
                    ele.Date = 'NA';
                    return;
                }

            });
            $scope.RoomSelected = '';
        }
    }
}).factory('mainFac', function($rootScope ){
    console.log('the factory function executed');
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



