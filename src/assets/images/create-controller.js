/**
 * Created by krishna on 17/2/18.
 */
angular.module('com.module.reports')
  .controller('reportsCreateController', ['$scope', '$modal', '$state','toaster', 'appConfig', 'organizationsFactory', 'brachesAssetFactory','classesAssetFactory', 'teachersAssetFactory','$q','$http',
    function ($scope, $modal, $state, toaster, appConfig, organizationsFactory, brachesAssetFactory,classesAssetFactory, teachersAssetFactory,$q,$http) {

      var orgId, branchId,classId, sectionId, dateTime;

      organizationsFactory.getOrganizations().success(function (response) {
        console.log('response branch', response);
        $scope.organizations = response.result;
      }).error(function (error) {
        console.log('error', error);
      });

      $scope.orgChange = function (org) {
        orgId = org._id;
        brachesAssetFactory.getBranches(orgId).success(function (response) {
          console.log('response branch', response.result);
          $scope.branches = response.result;
        }).error(function (error) {
          console.log('error', error);
        });
      };
      $scope.branchChange = function (branch) {
        branchId = branch._id
        classesAssetFactory.getRegisterClassNames(orgId, branchId).success(function (response) {
          console.log('response class', response.result);
          $scope.classes = response.result;
        }).error(function (error) {
          console.log('error', error);
        });
      };
      $scope.classChange = function (classInfo) {
        classId = classInfo._id;
      }

      // $scope.dateChange = function(date){
      //   dateTime = moment(date).format('MMM Do YY');
      //   console.log(dateTime);
      // }


      $scope.mytime2 = new Date();

      $scope.createTeacher = function (teacherInfo){
        var teacherDetails = {}, teacher = {};
        teacherDetails = teacherInfo;
        teacherDetails.role = 'teacher';
        teacher.organizationId = orgId;
        teacher.branchId = branchId;
        // teacher.dateJoined = dateTime;
        teacherDetails.teacher = teacher;
        teachersAssetFactory.createTeacher(teacherDetails).success(function (response) {
          $state.go('app.teachers.view');
          console.log("response :",response);
        }).error (function (error){
          console.log("error data:",error);
        });
        $scope.myPromise = $q.all().then(function(result){
          toaster.pop('success','Teacher created successfully.');
        });
      };
      $scope.resetAsset = function () {
        $scope.parent = {};
        $scope.organization = {};
        $scope.branch = {};
        //$scope.class = {};
        $scope.addForm.$setPristine();
      };
  }]);
