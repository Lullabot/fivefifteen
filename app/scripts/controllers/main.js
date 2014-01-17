'use strict';

angular.module('fivefifteenApp')
  .controller('MainCtrl', function ($scope, Data) {

    // Site Name
    $scope.siteName = "FiveFifteen";

    // Simple Data service to persist form values.
    $scope.data = Data;

    // Admin Contact
    $scope.admin = "seth@lullabot.com";
    
    // Define variable for opening email.
    $scope.sendEmail = function() { sendMail($scope); };
    // This variable holds all of the text used on the site. Please use markdown here.
    var steps = {
  
      'success' : {
          "title": "## Recent Successes",
          "text": "Gloat, it's good for ya. Note even the small successes. It's also very good Karma to mention the team members that helped."
      },

      'learned' : {
          'title' : '## Things I’ve Learned Recently',
          'text' : "Keep in mind both professional AND personal things here. Here are some topics to help prime your thinking: Professional might include: Learned a new project methodology, deepened a core skill, evolved coding prowess, took a Coursera course, or other things related to your job role. Personal skills might cover: time management, associate mentorship, social skills, and company culture perspectives."
      },
      
      'challenges' : {
          'title' : '## Current Challenges',
          'text' : "Everybody has 'em. Talking openly about challenges provides you the opportunity to get direct mentorship (something not to miss) from your manager or mentor and helps to clarify things for them to focus on. Course the goal is that items under “Current Challenges” move up to “Things I’ve Learned Recently.” "
      },

      'projects' : {
          'title' : '## Project Updates/Reviews',
          'text' : "This could be a status update on a particular project, or topics and concepts that come up in the context of projects, but live beyond the context of a specific client. Try answering these questions to get yourself started:"
                  + "\n\n"
                      + "* Are your projects on time?\n"
                      + "* How is your workload?\n"
                      + "* How goes your collaboration with peers?\n"
                      + "* Are there unexpected elements to any of your projects?\n"
      },

      'objectives' : {
          'title' : '## Annual Development Objectives',
          'text' : "Identify skills you would like to develop or opportunities you would like to experience. This may not change very often, but it serves as a reminder to discuss opportunities to develop."
      },

      'feedback' : {
          'title' : '## Feedback for Your Manager',
          'text' : "Time to provide some feedback to your manager. Again, be honest. Everybody can improve what they do. Honesty is the start."
      },
      
      url: 'views/steps.html'
    };

    $scope.steps = steps;

    $scope.shebang = ""
      + steps.success.title
      + "\n"
      + steps.success.text
      + "\n\n"
      + [Data.success === 'undefined' ? '' : Data.success]
      + "\n\n"
      + steps.learned.title
      + "\n"
      + steps.learned.text
      + "\n\n"
      + [Data.learned === 'undefined' ? '' : Data.learned]
      + "\n\n"
      + steps.challenges.title
      + "\n"
      + steps.challenges.text
      + "\n\n"
      + [Data.challenges === 'undefined' ? '' : Data.challenges]
      + "\n\n"
      + steps.projects.title
      + "\n"
      + steps.projects.text
      + "\n\n"
      + [Data.projects === 'undefined' ? '' : Data.projects]
      + "\n\n"
      + steps.objectives.title
      + "\n"
      + steps.objectives.text
      + "\n\n"
      + [Data.objectives === 'undefined' ? '' : Data.objectives]
      + "\n\n"
      + steps.feedback.title
      + "\n"
      + steps.feedback.text
      + "\n\n"
      + [Data.feedback === 'undefined' ? '' : Data.feedback]
      + "\n\n"
      + "";
  })

  // scope data is not persistent across views so we use a simple service.
  .factory('Data', function () {
    return {};
  });

function sendMail($scope) {
  var mailTo = $scope.admin;
  var subject = $scope.siteName;
  var link = 'mailto:' + mailTo +'?subject=Report from ' + subject;

  window.location.href = link;
};
