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
            val == 'AR' ? ( $scope.displayRooms = $scope.HotelRoomsArray.AvailableRoom , $scope.ShowAvailableRooms = true, $scope.ShowOccupiedRooms = false ) 
                        : ( $scope.displayRooms = $scope.HotelRoomsArray.OccupiedRoom ,  $scope.ShowOccupiedRooms = true , $scope.ShowAvailableRooms = false)  ; 
            console.log('the rooms to be displayed are : ' ,$scope.displayRooms );
            $("#showModalBtn").click();

        },

        $scope.checkIn = function (val) {
            console.log(' the systen is gona chcek you in : ' , val );
            $("#showDateTimeModal").click();
        },
         $scope.checkOut = function () {
             console.log('the system is going to check you out ');
        }
    }
});



