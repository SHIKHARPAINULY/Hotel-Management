angular.module('HotelApp' , ['720kb.datepicker']).component('buttonCtrl' , {
    restrict:'E',
    templateUrl:'button/button.component.html',
    bindings : {
        showRoom : '<'
    },
    controller : function ($scope , $rootScope) {
        $scope.ShowAvailableRooms = false;
        $scope.ShowOccupiedRooms = false;
        $scope.HotelRoomsArray = {
            OccupiedRoom : ['F1b', 'F1c', 'F1d', 'F2d', 'F2e' , 'F3a' , 'F3c', 'F3d'],
            AvailableRoom : ['F1a' , 'F1e' , 'F2a' , 'F2b', 'F2c' ,'F3b', 'F3e']
        };

        $scope.showModal = function (val) {
            $scope.displayRooms = [];
            val == 'AR' ? ($scope.RoomSelection = 'AvailableRoom' , $scope.displayRooms = $scope.HotelRoomsArray.AvailableRoom , $scope.ShowAvailableRooms = true, $scope.ShowOccupiedRooms = false ) 
                        : ($scope.RoomSelection = 'OccupiedRoom' ,  $scope.displayRooms = $scope.HotelRoomsArray.OccupiedRoom ,  $scope.ShowOccupiedRooms = true , $scope.ShowAvailableRooms = false)  ; 
            console.log('the rooms to be displayed are : ' ,$scope.displayRooms );
            $("#showModalBtn").click();

        },

        $scope.checkIn = function (val) {
            $scope.RoomSelected = val;
            $("#showDateTimeModal").click();
        },
         $scope.checkOut = function (val) {
            $scope.RoomSelected = val;
             console.log('the system is going to check you out ');
        },
        $scope.saveChange =  function () {
            console.log( ' the selction room is : ' , $scope.RoomSelected && $scope.RoomSelection );
            if( $scope.RoomSelection  == 'AvailableRoom' ) {
                $scope.HotelRoomsArray.AvailableRoom =  $scope.HotelRoomsArray.AvailableRoom.filter(ele => ele != $scope.RoomSelected)
                console.log('the new selection for room : ' ,  $scope.HotelRoomsArray.AvailableRoom );
                $scope.HotelRoomsArray.OccupiedRoom.push($scope.RoomSelected);
                console.log('the new selection for room : ' ,$scope.HotelRoomsArray.OccupiedRoom );
            }else if( $scope.RoomSelection  == 'OccupiedRoom' ) {
                $scope.HotelRoomsArray.OccupiedRoom = $scope.HotelRoomsArray.OccupiedRoom.filter( ele => ele != $scope.RoomSelected);
                console.log('the new selection for room : ' ,$scope.HotelRoomsArray.OccupiedRoom );
                $scope.HotelRoomsArray.AvailableRoom.push($scope.RoomSelected);
                console.log('the new selection for room : ' ,  $scope.HotelRoomsArray.AvailableRoom );
            }
        },
        $scope.$watch('HotelRoomsArray' , function(newVal, oldVal){
            console.log('the  values changed are', oldVal , newVal);

        }, true);
    }
});



