angular.module('HotelApp' , ['720kb.datepicker', 'factoryService', 'HotelError']).component('dashCtrl' , {
    restrict:'E',
    templateUrl:'./dashboard/dashboard.component.html',
    bindings : {
        showRoom : '<'
    },
    controller : function ($scope , $rootScope , dataService) {
        console.log('the buttonCtrl controller executed' , dataService);
        $scope.ShowAvailableRooms = false;
        $scope.ShowOccupiedRooms = false;
        $scope.roomError = false;
        $scope.RoomSelected = '';
        $scope.date = new Date().toLocaleDateString('en-GB');
        $scope.showModal = function (val) {
            $scope.displayRooms = [];
            val == 'AR' ? ($scope.RoomSelection = 'AvailableRoom' , $scope.displayRooms = dataService.AvailableRoom , $scope.ShowAvailableRooms = true, $scope.ShowOccupiedRooms = false ) 
                        : ($scope.RoomSelection = 'OccupiedRoom' ,  $scope.displayRooms = dataService.OccupiedRoom ,  $scope.ShowOccupiedRooms = true , $scope.ShowAvailableRooms = false)  ; 
            $("#showModalBtn").click();
        },
        $scope.saveDate = function () {
            dataService.AvailableRoom.filter( Element => {
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
                $rootScope.errorRoomNumber = $scope.RoomSelected.roomNumber;
                $scope.roomError = true;
                $("#OneAtATimeModal").click();
            }
        },
         $scope.checkOut = function (val) {
            if( $scope.RoomSelected == undefined || $scope.RoomSelected == '' ) {
                $scope.RoomSelected = JSON.parse(val);
            } else {  
                $rootScope.errorRoomNumber = $scope.RoomSelected.roomNumber;
                $scope.roomError = true;
                $("#OneAtATimeModal").click();
            }
        },
        $scope.saveChange =  function () {
            if( $scope.RoomSelection  == 'AvailableRoom' ) {
                dataService.AvailableRoom =  dataService.AvailableRoom.filter(ele =>  ele.roomNumber != $scope.RoomSelected.roomNumber);
                $scope.RoomSelected.Date = $scope.date;
                dataService.OccupiedRoom.push($scope.RoomSelected);
                $scope.RoomSelected = '';
            }else if( $scope.RoomSelection  == 'OccupiedRoom' ) {
                dataService.OccupiedRoom = dataService.OccupiedRoom.filter( ele => ele.roomNumber != $scope.RoomSelected.roomNumber);
                $scope.RoomSelected.Date = 'NA';
                dataService.AvailableRoom.push($scope.RoomSelected);
                $scope.RoomSelected = '';
            }
        },
        $scope.$watch('HotelRoomsArray' , function(newVal, oldVal){
            if( newVal != oldVal) {
                dataService =  dataService;
            }

        }, true);
        $scope.Undo = function(val) {
            $scope.RoomSelected = JSON.parse(val);
            dataService.AvailableRoom.filter(ele =>  {
                if(ele.roomNumber == $scope.RoomSelected.roomNumber ) {
                    ele.Date = 'NA';
                    return;
                }

            });
            $scope.RoomSelected = '';
        }
    }
});