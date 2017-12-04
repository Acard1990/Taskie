var taskie = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.render();
  },
  cacheDom: function() {
    this.$curUserTask = $('#myTasks');
    this.$curUserPickedUp = $('#pickedUp');
    this.$otherUserTasks = $('#allTasks');
    this.pickUp = $(`<button class="btn btn-sm btn-add-task pickUp">Pick Up</button>`);
    this.addForm = $('#addTaskForm');
    this.createTaskText = $('#createNewTask');
    this.$welcomeText = $('#welcomeText');
    this.$myCompletedTasks = $('#completed');
    this.descriptions = $('');
  },
  bindEvents: function() {
    this.createTaskText.on('click', this.showTaskForm.bind(this));
  },
  render: function() {
    taskie.$curUserTask.empty();
    taskie.$curUserPickedUp.empty();
    taskie.$otherUserTasks.empty();
    taskie.$myCompletedTasks.empty();
    this.currUser();
    this.usersTasks();
    this.currUserAssignments();
    this.allMyCompletedTasks();
    this.addForm.hide();
    $('.task-details-row').hide();
  },
  currUser: function() {
    $.ajax({
      url: '/profile/api/curr_user',
      method: 'GET'
    }).done(response => {
      console.log(response);
      for (let i=0;i<response.length;i++) {
        if (response[i].status == false && response[i].Assignment == null) {
          let p =
            $(`<div class="row">
                <div class="col-5 middle-this">
                  <p>
                    <span class="dot-unassigned"></span>
                    ${response[i].description}
                  </p>
                </div>
                <div class="col-4 middle-this">
                  <p>
                  </p>
                </div>
                <div class="col-3">
                </div>
              </div>`);
          taskie.$curUserTask.append(p);
        } else if (response[i].status == false) {
          let p =
            $(`<div class="row">
                <div class="col-5 middle-this">
                  <p>
                    <span class="dot"></span>
                    ${response[i].description}
                  </p>
                </div>
                <div class="col-4 middle-this">
                  <p>
                    picked by: ${response[i].Assignment.User.firstName} ${response[i].Assignment.User.lastName}
                  </p>
                </div>
                <div class="col-3">
                </div>
              </div>`);
          taskie.$curUserTask.append(p);
        }
      }
    });
  },
  usersTasks: function() {
    $.ajax({
      url: 'profile/api/other/tasks',
      method: 'GET'
    }).done(response => {
      console.log(response);
      for (let i=0;i<response.length;i++) {
        if (response[i].Assignment == null) {
          let p =
            $(`<div class="row otherUserTasks">
              <div class="col-5 middle-this">
                <p>
                  ${response[i].description}
                </p>
              </div>
              <div class="col-4 middle-this">
                <p>
                  for: ${response[i].User.firstName} ${response[i].User.lastName}
                </p>
              </div>
              <div class="col-3">
                <button class="btn btn-sm btn-grab-task pickUp" data-id="${response[i].id}">Pick Up</button>
              </div>
            </div>`);
          taskie.$otherUserTasks.append(p);
        }
      }
    });
  },
  currUserAssignments: function() {
    $.ajax({
      url: '/profile/api/curr_user/assignments',
      method: 'GET'
    }).done(response => {
      console.log(response);
      for (let i=0;i<response.length;i++) {
        if (response[i].Task.status == false) {
          let p =
            $(`<div class="otherUserTasks">
                <div id="Task_ID${response[i].Task.id}" class="row task-description-row">
                  <div class="col-5 middle-this">
                    <p>
                      ${response[i].Task.description}
                    </p>
                  </div>
                  <div class="col-4 middle-this">
                    <p>
                      for: ${response[i].Task.User.firstName} ${response[i].Task.User.lastName}
                    </p>
                  </div>
                  <div class="col-3">
                    <button class="btn btn-sm btn-grab-task done" data-id="${response[i].Task.id}">Done</button>
                  </div>
                </div>
                <div class="row task-details-row">
                  <p class="col-12">${response[i].Task.details}</p>
                </div>
              </div>`);
          taskie.$curUserPickedUp.append(p);
        }
      }
    });
  },
  allMyCompletedTasks: function() {
    $.ajax({
      url: '/profile/api/curr_user',
      method: 'GET'
    }).done(response => {
      console.log(response);
      for (let i=0;i<response.length;i++) {
        if (response[i].status == true) {
          let p =
            $(`<div class="row">
              <div class="col-5 middle-this">
                <p class="strikethrough">
                  <span class="dot"></span>
                  ${response[i].description}
                </p>
              </div>
              <div class="col-4 middle-this">
                <p class="strikethrough">
                  by: ${response[i].Assignment.User.firstName} ${response[i].Assignment.User.lastName}
                </p>
              </div>
              <div class="col-3">
                <button class="btn btn-sm btn-grab-task reward" data-id="${response[i].id}">Reward</button>
              </div>
            </div>`);
          taskie.$myCompletedTasks.append(p);
        }
      }
    });
  },
  showTaskForm: function() {
    this.addForm.toggle();
  }
};

taskie.init();

$(document).on('click', '.pickUp', function(){
  let taskId= $(this).data('id');
  console.log(taskId);
  $.ajax({
    url: '/profile/api/grab/task/' + taskId,
    method: 'POST'
  }).then((response) => {
    console.log("Picked up");
    taskie.render();
  });
});

$(document).on('click', '.reward', function(){
  let taskId= $(this).data('id');
  console.log(taskId);
  $.ajax({
    url: '/profile/api/reward/task/' + taskId,
    method: 'PUT'
  }).then((response) => {
    console.log("Completed");
    taskie.render();
  });
});

$(document).on('click', '.done', function(){
  let taskId= $(this).data('id');
  console.log(taskId);
  $.ajax({
    url: '/profile/api/complete/task/' + taskId,
    method: 'PUT'
  }).then((response) => {
    console.log("Picked up");
    taskie.render();
  });
});

$(document).on('click', '.task-description-row', function() {
  $(this).toggleClass('task-description-row-background');
  $(this).parent().find('.task-details-row').toggle();
});
