'use strict';

angular.module('fivefifteenApp')
  .controller('MainCtrl', function ($scope, Data) {

    // Simple Data service to persist form values.
    $scope.data = Data;
    
    // Used to include the steps.html
    $scope.steps = {
      stops : [
        'success',
        'learned',
        'challenges',
        'projects',
        'objectives',
        'feedback'
      ],
      url: 'views/steps.html'
    };

    $scope.shebang = ""
    + "## Recent Successes"
    + "\n"
    + "> Gloat, it's good for ya. Note even the small successes. It's also very good Karma to mention the team members that helped."
    + "\n\n"
    + Data.success
    + "\n\n"
    + "## Things I’ve Learned Recently"
    + "\n"
    + "> Keep in mind both professional AND personal things here. If you've suddenly realized that personal hygene relates to your coworkers and friends, shout it out. Here are some topics to help prime your thinking: Professional might include: InDesign functionality, deepening of a core skill, coding skills evolution, client management wizardry, and other things related to your job role. Personal skills might cover: time management, associate mentorship, social skills, and company culture perspectives."
    + "\n\n"
    + Data.learned
    + "\n\n"
    + "## Current Challenges"
    + "\n"
    + "> Everybody has 'em. Talking openly about challenges provides you the opportunity to get direct mentorship (something not to miss) from your manager or mentor and helps to clarify things for them to focus on. Course the goal is that items under “Current Challenges” move up to “Things I’ve Learned Recently.” "
    + "\n\n"
    + Data.challenges
    + "\n\n"
    + "## Project Updates/Reviews"
    + "\n"
    + "> This is not a postmortem, or chance to sneak a project meeting. This conversation should focus on personal and career development, not status updates. Topics and concepts that come up in the context of projects, but live beyond the context of a specific client. Try answering these questions to get yourself started:"
    + "\n"
        + "* Are your projects on time?"
        + "* How is your workload?"
        + "* How goes your collaboration with peers?"
        + "* Are there unexpected elements to any of your projects?"
    + "\n\n"
    + Data.projects
    + "\n\n"
    + "## Annual Development Objectives"
    + "\n"
    + "> Identify skills you would like to develop or opportunities you would like to experience. This may not change very often, but it serves as a reminder to discuss opportunities to develop."
    + "\n\n"
    + Data.objectives
    + "\n\n"
    + "## Feedback for Your Manager"
    + "\n"
    + "> Time to provide some feedback to your manager. Again, be honest everybody can improve what they do. Honesty is the start."
    + "\n\n"
    + Data.feedback
    + "\n\n"
    + "";
  })

  // scope data is not persistent across views so we use a simple service.
  .factory('Data', function () {
    return {};
  });
