function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getCSRFTokenValue() {
  return getCookie('csrftoken');
}

function getSessionIdValue() {
  return getCookie('sessionid');
}

function addZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
/**
 * Chuyển thời gian sang định dạng khác(vd: 2023-01-14T15:17:20.804756+07:00 => 14/01/2023)
 * @param {datetime} time 
 * @param {string} format 
 * @returns 
 */
function strftime(time, format) {
  if (time == "") return "";
  if (time.length < 8) {
    return time;
  }
  var todayTime = null;
  if (format == "HH:mm:ss") {
    time_init = "01/01/1970 " + time
    todayTime = new Date(time_init);
  } else {
    todayTime = new Date(time);
  }
  // console.log(todayTime instanceof Date && !isNaN(todayTime))
  if (todayTime instanceof Date && !isNaN(todayTime)) {
    // var month = todayTime.getMonth() + 1;
    // var day = todayTime.getDate();
    // var year = todayTime.getFullYear();
    return moment(todayTime).format(format);
    // return addZero(day) + "/" + addZero(month) + "/" + addZero(year);
  } else {
    return null;
  }
}
/**
 * chuyển từ thời gian chuỗi sang datetime(python)
 * @param {string} timeStr 
 * @param {string} format 
 * @returns 
 */
function strptime(timeStr, format) {
  if (timeStr == "") return "";
  try {
    var time = new Date(moment(timeStr, format));
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var year = time.getFullYear();
    var sec = time.getSeconds();
    var min = time.getMinutes();
    var hour = time.getHours();
    if (format == "DD/MM/YYYY") {
      return moment(time).format("YYYY-MM-DD");
    } else if (format == "HH:mm") {
      return moment(time).format(format);
    }
    return (

      addZero(year) +
      "-" +
      addZero(month) +
      "-" +
      addZero(day) +
      "T" +
      addZero(hour) +
      ":" +
      addZero(min)

    );
  } catch (error) {
    console.log(error);
    return time;
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
}

// UUIDv4 Generator
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// function BindActionButtonVer4(
//   OrganizationmanagementSystemOrganizationManagement_arr_action,
//   uuid,
//   $this,
//   A,B )
// {
// return `
// <!--begin::Action=-->
//   <a href="#" class="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
//   <!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->
//   <span class="svg-icon svg-icon-5 m-0">
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="currentColor" />
//     </svg>
//   </span>
//   <!--end::Svg Icon--></a>
//   <!--begin::Menu-->
//   <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">
//     <!--begin::Menu item-->
//     <div class="menu-item px-3">
//       <a href="" class="menu-link px-3">Edit</a>
//     </div>
//     <!--end::Menu item-->
//     <!--begin::Menu item-->
//     <div class="menu-item px-3">
//       <a href="#" class="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
//     </div>
//     <!--end::Menu item-->
//   </div>
//   <!--end::Menu-->
// <!--end::Action=-->
// `;
// }
let preloader = $('#preloader');

function BindActionButtonVer4(
  arr_action,
  Id,
  currentRow,
  arr_views = null,
  request_user,
  custom_action_btn_title = ''
) {
  if (arr_action.length == 0) {
    return "";
  }
  var custom_action = '';

  default_action = `

`;
  defaul_type = ["delete", "edit", "detail", "send", "export", "add_transition", "remove_transition", "approve", "cancel","edit_survey", "OK", "reject"]
  //     action_html =  `      

  //     <td><div class="btn-group w-100 mx-auto">
  //                  <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i></button>
  //                  <div class="dropdown-menu">
  //     `
  //     action_html =  `      
  //     <td>
  //     <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"></i></button>
  //     <button class="btn btn-datatable btn-icon btn-transparent-dark"><i data-feather="trash-2"></i></button>
  // </td>
  //     `
  //     return action_html;
  arr_action.forEach((ac) => {
    // console.log("field_checking", ac["field_checking"]);
    // console.log("currentRow", currentRow);
    // console.log(
    //   'currentRow[ac["field_checking"]]',
    //   currentRow[ac["field_checking"]],
    // );
    // console.log(
    //   "ket qua",
    //   currentRow[ac["field_checking"]] == ac["value_is_true"],
    // );
    if ((!ac["value_is_true"] || ac["value_is_true"] == "false") && !currentRow.hasOwnProperty(ac["field_checking"])) {
      currentRow[ac["field_checking"]] = false;
    }
    if (arr_views != null && arr_views.length > 0) {
      if (
        ((
            ac["isCheck"] == true && // neu check
            currentRow[ac["field_checking"]] == ac["value_is_true"]) || // thi phai co gia tri tren ban ghi thoa man thi tra ve true
          ac["isCheck"] == false
        )
      ) {

        if (defaul_type.includes(ac["type"])) {
          default_action += returnActionDefault(ac["type"], ac["title"], ac["func"], Id);
        } else {
          custom_action +=
            '            <a class="dropdown-item d-flex align-items-center" uuid="' +
            Id +
            '" onclick="' +
            ac["func"] +
            "('" +
            Id +
            "')" +
            '">' +
            '               &nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
        }
      }
    }
    // neu list view = null 
    else {
      if (
        ((
            ac["isCheck"] == true &&
            currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
          ac["isCheck"] == false
        )
        // &&
        // (
        //     (currentRow["created_by__username"] == request_user &&
        //         ac["allowSelfChecking"]) || ac['independent_views'] == true
        // )
      ) {
        if (defaul_type.includes(ac["type"])) {
          default_action += returnActionDefault(ac["type"], ac["title"], ac["func"], Id);
        } else {
          custom_action +=
            '            <a class="dropdown-item d-flex align-items-center" uuid="' +
            Id +
            '" onclick="' +
            ac["func"] +
            "('" +
            Id +
            "')" +
            '">' +
            '               &nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
        }
      }

    }
  });

  var custom_action_btn = ``;
  if (custom_action != "" && custom_action != null) {
    custom_action_btn = `
      <button type="button" class=" btn btn-icon btn-active-light-primary w-30px h-30px" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="svg-icon svg-icon-1" title="${custom_action_btn_title}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>
            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>
          </svg>
        </span>          
      </button>
      <div class="dropdown-menu">
      ${custom_action}
      </div>
    `;
  }


  action_html = `
    <td class="text-center">
        <div class="btn-group w-100 mx-auto">
        ${default_action}
        ${custom_action_btn}
      </div>
    </td>`
  return action_html;
}

function BindActionButtonVer6(
  arr_action,
  Id,
  currentRow,
  arr_views = null,
  request_user,
  custom_action_btn_title = ''
) {
  if (arr_action.length == 0) {
    return "";
  }
  var custom_action = '';

  default_action = `

`;
  defaul_type = [ "edit", "detail", ]
  //     action_html =  `      

  //     <td><div class="btn-group w-100 mx-auto">
  //                  <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i></button>
  //                  <div class="dropdown-menu">
  //     `
  //     action_html =  `      
  //     <td>
  //     <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"></i></button>
  //     <button class="btn btn-datatable btn-icon btn-transparent-dark"><i data-feather="trash-2"></i></button>
  // </td>
  //     `
  //     return action_html;
  arr_action.forEach((ac) => {
    // console.log("field_checking", ac["field_checking"]);
    // console.log("currentRow", currentRow);
    // console.log(
    //   'currentRow[ac["field_checking"]]',
    //   currentRow[ac["field_checking"]],
    // );
    // console.log(
    //   "ket qua",
    //   currentRow[ac["field_checking"]] == ac["value_is_true"],
    // );
    if ((!ac["value_is_true"] || ac["value_is_true"] == "false") && !currentRow.hasOwnProperty(ac["field_checking"])) {
      currentRow[ac["field_checking"]] = false;
    }
    if (arr_views != null && arr_views.length > 0) {
      if (
        ((
            ac["isCheck"] == true && // neu check
            currentRow[ac["field_checking"]] == ac["value_is_true"]) || // thi phai co gia tri tren ban ghi thoa man thi tra ve true
          ac["isCheck"] == false
        )
      ) {

        if (defaul_type.includes(ac["type"])) {
          default_action += returnActionDefault(ac["type"], ac["title"], ac["func"], Id);
        } else {
          custom_action +=
            '            <a class="dropdown-item d-flex align-items-center" uuid="' +
            Id +
            '" onclick="' +
            ac["func"] +
            "('" +
            Id +
            "')" +
            '">' +
            '               &nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
        }
      }
    }
    // neu list view = null 
    else {
      if (
        ((
            ac["isCheck"] == true &&
            currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
          ac["isCheck"] == false
        )
        // &&
        // (
        //     (currentRow["created_by__username"] == request_user &&
        //         ac["allowSelfChecking"]) || ac['independent_views'] == true
        // )
      ) {
        if (defaul_type.includes(ac["type"])) {
          default_action += returnActionDefault(ac["type"], ac["title"], ac["func"], Id);
        } else {
          custom_action +=
            '            <a class="dropdown-item d-flex align-items-center" uuid="' +
            Id +
            '" onclick="' +
            ac["func"] +
            "('" +
            Id +
            "')" +
            '">' +
            '               &nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
        }
      }

    }
  });

  var custom_action_btn = ``;
  if (custom_action != "" && custom_action != null) {
    custom_action_btn = `
    <button type="button" class=" btn btn-icon btn-active-light-primary w-30px h-30px" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="svg-icon svg-icon-1" title="${custom_action_btn_title}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>
          <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>
        </svg>
      </span>          
    </button>
    <div class="dropdown-menu">
    ${custom_action}
    </div>
    `;
  }


  action_html = `
    <div class="btn-group w-100 mx-auto">
    ${default_action}
    ${custom_action_btn}
  </div>`
  return action_html;
}


function BindActionButtonVer4_1(
  arr_action,
  Id,
  currentRow,
  arr_views = null,
  request_user,
) {
  if (arr_action.length == 0) {
    return "";
  }
  var custom_action = '';

  default_action = `

`;
  defaul_type = ["delete", "edit", "detail"]
  //     action_html =  `      

  //     <td><div class="btn-group w-100 mx-auto">
  //                  <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i></button>
  //                  <div class="dropdown-menu">
  //     `
  //     action_html =  `      
  //     <td>
  //     <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"></i></button>
  //     <button class="btn btn-datatable btn-icon btn-transparent-dark"><i data-feather="trash-2"></i></button>
  // </td>
  //     `
  //     return action_html;
  arr_action.forEach((ac) => {
    // console.log("field_checking", ac["field_checking"]);
    // console.log("currentRow", currentRow);
    // console.log(
    //   'currentRow[ac["field_checking"]]',
    //   currentRow[ac["field_checking"]],
    // );
    // console.log(
    //   "ket qua",
    //   currentRow[ac["field_checking"]] == ac["value_is_true"],
    // );
    if ((!ac["value_is_true"] || ac["value_is_true"] == "false") && !currentRow.hasOwnProperty(ac["field_checking"])) {
      currentRow[ac["field_checking"]] = false;
    }
    if (arr_views != null && arr_views.length > 0) {
      if (
        ((
            ac["isCheck"] == true && // neu check
            currentRow[ac["field_checking"]] == ac["value_is_true"]) || // thi phai co gia tri tren ban ghi thoa man thi tra ve true
          ac["isCheck"] == false
        )
      ) {

        if (defaul_type.includes(ac["type"])) {
          default_action += returnActionDefault(ac["type"], ac["func"], Id);
        } else {
          custom_action +=
            '            <a class="dropdown-item d-flex align-items-center" uuid="' +
            Id +
            '" onclick="' +
            ac["func"] +
            "('" +
            Id +
            "')" +
            '">' +
            '               &nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
        }
      }
    }
    // neu list view = null 
    else {
      if (((
            ac["isCheck"] == true &&
            currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
          ac["isCheck"] == false
        )) {
        if (defaul_type.includes(ac["type"])) {
          default_action += returnActionDefault(ac["type"], ac["func"], Id);
        } else {
          custom_action +=
            '            <a class="dropdown-item d-flex align-items-center" uuid="' +
            Id +
            '" onclick="' +
            ac["func"] +
            "('" +
            Id +
            "')" +
            '">' +
            '               &nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
        }
      }

    }
  });

  var custom_action_btn = ``;
  if (custom_action != "" && custom_action != null) {
    custom_action_btn = `
    <button type="button" class=" btn btn-icon btn-active-light-primary w-30px h-30px" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="svg-icon svg-icon-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>
          <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>
        </svg>
      </span>          
    </button>
    <div class="dropdown-menu">
    ${custom_action}
    </div>
    `;
  }


  action_html = `
<td class="text-center">
    <div class="btn-group w-100 mx-auto">
    ${default_action}
    ${custom_action_btn}
  </div>
</td>  `
  return action_html;
}


function BindActionButtonOnlyActionVer1(
  arr_action,
  Id,
  currentRow,
  arr_views = null,
  request_user,
) {
  if (arr_action.length == 0) {
    return "";
  }
  var custom_action = '';

  default_action = `

`;
  defaul_type = ["delete", "edit", "detail", "send"]
  //     action_html =  `      

  //     <td><div class="btn-group w-100 mx-auto">
  //                  <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i></button>
  //                  <div class="dropdown-menu">
  //     `
  //     action_html =  `      
  //     <td>
  //     <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"></i></button>
  //     <button class="btn btn-datatable btn-icon btn-transparent-dark"><i data-feather="trash-2"></i></button>
  // </td>
  //     `
  //     return action_html;
  arr_action.forEach((ac) => {
    // console.log("field_checking", ac["field_checking"]);
    // console.log("currentRow", currentRow);
    // console.log(
    //   'currentRow[ac["field_checking"]]',
    //   currentRow[ac["field_checking"]],
    // );
    // console.log(
    //   "ket qua",
    //   currentRow[ac["field_checking"]] == ac["value_is_true"],
    // );
    if ((!ac["value_is_true"] || ac["value_is_true"] == "false") && !currentRow.hasOwnProperty(ac["field_checking"])) {
      currentRow[ac["field_checking"]] = false;
    }
    if (arr_views != null && arr_views.length > 0) {
      if (
        ((
            ac["isCheck"] == true && // neu check
            currentRow[ac["field_checking"]] == ac["value_is_true"]) || // thi phai co gia tri tren ban ghi thoa man thi tra ve true
          ac["isCheck"] == false
        )
      ) {

        if (defaul_type.includes(ac["type"])) {
          default_action += returnActionDefault(ac["type"], ac["func"], Id);
        } else {
          custom_action +=
            '<a class="dropdown-item d-flex align-items-center" uuid="' +
            Id +
            '" onclick="' +
            ac["func"] +
            "('" +
            Id +
            "')" +
            '">' +
            '&nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
        }
      }
    }
    // neu list view = null 
    else {
      if (
        ((
            ac["isCheck"] == true &&
            currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
          ac["isCheck"] == false
        )
        // &&
        // (
        //     (currentRow["created_by__username"] == request_user &&
        //         ac["allowSelfChecking"]) || ac['independent_views'] == true
        // )
      ) {
        if (defaul_type.includes(ac["type"])) {
          default_action += returnActionDefault(ac["type"], ac["func"], Id);
        } else {
          custom_action +=
            '<a class="dropdown-item d-flex align-items-center" uuid="' +
                  Id +
                  '" onclick="' +
                  ac["func"] +
                  "('" +
                  Id +
                  "')" +
                  '">' +
                  '               &nbsp;<i title="' +
                  ac["title"] +
                  '" class="' +
                  ac["icon"] +
                  '" onclick="' +
                  ac["func"] +
                  '"></i>&nbsp;' +
                  "                " +
                  ac["title"] +
            "</a>";
        }
      }

    }
  });

  var custom_action_btn = ``;
  if (custom_action != "" && custom_action != null) {
    custom_action_btn = `
    <button type="button" class=" btn btn-icon btn-active-light-primary w-30px h-30px" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="svg-icon svg-icon-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>
          <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>
        </svg>
      </span>          
    </button>
    <div class="dropdown-menu">
    ${custom_action}
    </div>
    `;
  }


  action_html = `
    <div class="btn-group w-100 mx-auto">
    ${default_action}
    ${custom_action_btn}
  </div>
`
  return action_html;
}

function returnActionDefault(type, title="", func, uuid) {
  var button = "";
  if (type == "delete") {

    button = `     
  <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="delete_row" onclick="${func}('${uuid}')">
    <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
    <span class="svg-icon svg-icon-2" title="Xóa">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"></path>
        <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"></path>
        <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"></path>
      </svg>
    </span>
    <!--end::Svg Icon-->
</button>
`;

  } else if (type == "edit") {
    button = `     
  <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="edit_row" onclick="${func}('${uuid}')">
  <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/jet/html/releases/2023-01-23-171716/core/html/src/media/icons/duotune/general/gen055.svg-->
    <span class="svg-icon svg-icon-2 " title="Sửa">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="currentColor"/>
        <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="currentColor"/>
        <path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="currentColor"/>
      </svg>
    </span>
  <!--end::Svg Icon-->
</button>
`;
  } else if (type == "detail") {
    button = `     
<button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="detail_row" onclick="${func}('${uuid}')">
  <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/jet/html/releases/2023-01-23-171716/core/html/src/media/icons/duotune/general/gen005.svg-->
  <span class="svg-icon svg-icon-2" title="Xem chi tiết">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z" fill="currentColor"/>
        <rect x="7" y="17" width="6" height="2" rx="1" fill="currentColor"/>
        <rect x="7" y="12" width="10" height="2" rx="1" fill="currentColor"/>
        <rect x="7" y="7" width="6" height="2" rx="1" fill="currentColor"/>
        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"/>
      </svg>
      </span>
  <!--end::Svg Icon-->
 </button>

`;
  } else if (type == "send") {
    button = `     
  <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="send_row" onclick="${func}('${uuid}')">
  <span class="svg-icon svg-icon-primary svg-icon-2" title="Gửi đề xuất"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/Map/Direction2.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 24 24" version="1.1">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0" y="0" width="10" height="10"></rect>
        <path d="M14,13.381038 L14,3.47213595 L7.99460483,15.4829263 L14,13.381038 Z M4.88230018,17.2353996 L13.2844582,0.431083506 C13.4820496,0.0359007077 13.9625881,-0.12427877 14.3577709,0.0733126292 C14.5125928,0.15072359 14.6381308,0.276261584 14.7155418,0.431083506 L23.1176998,17.2353996 C23.3152912,17.6305824 23.1551117,18.1111209 22.7599289,18.3087123 C22.5664522,18.4054506 22.3420471,18.4197165 22.1378777,18.3482572 L14,15.5 L5.86212227,18.3482572 C5.44509941,18.4942152 4.98871325,18.2744737 4.84275525,17.8574509 C4.77129597,17.6532815 4.78556182,17.4288764 4.88230018,17.2353996 Z" fill="#a2a4b6" fill-rule="nonzero" transform="translate(14.000087, 9.191034) rotate(-315.000000) translate(-14.000087, -9.191034) "></path>
    </g>
  </svg><!--end::Svg Icon-->
  </span>
  </button>
`;
  } else if (type == "export") {
    button = `     
  <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="export" onclick="${func}('${uuid}')">
  <span class="svg-icon svg-icon-primary svg-icon-2" title="Kết xuất"><i class="fas fa-file-export"></i>
  </span>
  </button>
`;
  } else if (type == "add_transition") {
    button = `     
  <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="export" onclick="${func}('${uuid}')">
  <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/keenthemes/jet/docs/core/html/src/media/icons/duotune/arrows/arr024.svg-->
  <span class="svg-icon svg-icon-2" title="Thêm transition"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 4L18 12L10 20H14L21.3 12.7C21.7 12.3 21.7 11.7 21.3 11.3L14 4H10Z" fill="currentColor"/>
  <path opacity="0.3" d="M3 4L11 12L3 20H7L14.3 12.7C14.7 12.3 14.7 11.7 14.3 11.3L7 4H3Z" fill="currentColor"/>
  </svg>
  </span>
  <!--end::Svg Icon-->
  </button>
`;
  } else if (type == "remove_transition") {
    button = `     
  <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="export" onclick="${func}('${uuid}')">
  <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/keenthemes/jet/docs/core/html/src/media/icons/duotune/arrows/arr015.svg-->
  <span class="svg-icon svg-icon-2" title="${title}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.3" d="M12 10.6L14.8 7.8C15.2 7.4 15.8 7.4 16.2 7.8C16.6 8.2 16.6 8.80002 16.2 9.20002L13.4 12L12 10.6ZM10.6 12L7.8 14.8C7.4 15.2 7.4 15.8 7.8 16.2C8 16.4 8.3 16.5 8.5 16.5C8.7 16.5 8.99999 16.4 9.19999 16.2L12 13.4L10.6 12Z" fill="currentColor"/>
  <path d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM13.4 12L16.2 9.20001C16.6 8.80001 16.6 8.19999 16.2 7.79999C15.8 7.39999 15.2 7.39999 14.8 7.79999L12 10.6L9.2 7.79999C8.8 7.39999 8.2 7.39999 7.8 7.79999C7.4 8.19999 7.4 8.80001 7.8 9.20001L10.6 12L7.8 14.8C7.4 15.2 7.4 15.8 7.8 16.2C8 16.4 8.3 16.5 8.5 16.5C8.7 16.5 9 16.4 9.2 16.2L12 13.4L14.8 16.2C15 16.4 15.3 16.5 15.5 16.5C15.7 16.5 16 16.4 16.2 16.2C16.6 15.8 16.6 15.2 16.2 14.8L13.4 12Z" fill="currentColor"/>
  </svg>
  </span>
  <!--end::Svg Icon-->
  </button>
`;
  } else if (type == "approve") {
    button = `     
  <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="approve" onclick="${func}('${uuid}')">
  <span class="svg-icon svg-icon-primary svg-icon-2" title="Kết xuất"><i class="fas fa-clipboard-check"></i>
  </span>
  </button>
`;  
} else if (type == "OK") {
  button = `     
  <button class="btn btn-icon btn-active-light-primary w-20px h-30px" data-kt-permissions-table-filter="OK" onclick="${func}('${uuid}')">
  <span class="svg-icon svg-icon-primary svg-icon-medium" title="Phê duyệt"><i class="fa-solid fa-check" style="color: #63E6BE;"></i>
  </span>
  </button>
  `;
} else if (type == "reject") {
  button = `     
  <button class="btn btn-icon btn-active-light-primary w-20px h-30px" data-kt-permissions-table-filter="reject" onclick="${func}('${uuid}')">
  <span class="svg-icon svg-icon-primary svg-icon-medium" title="Từ chối"><i class="fa-solid fa-xmark" style="color: #5f0202;"></i>
  </span>
  </button>
  `;
  } else if (type == "cancel") {
    button = `     
  <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="cancel" onclick="${func}('${uuid}')">
  <span class="svg-icon svg-icon-primary svg-icon-2" title="Kết xuất"><i class="fas fa-window-close"></i>
  </span>
  </button>
`;
  }
  else if (type == "edit_survey") {
    button = `     
      <button class="btn btn-icon btn-active-light-primary w-30px h-30px" data-kt-permissions-table-filter="edit_row" onclick="${func}('${uuid}')">
      <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/jet/html/releases/2023-01-23-171716/core/html/src/media/icons/duotune/general/gen055.svg-->
        <span class="svg-icon svg-icon-2 " title="Đánh giá">
      <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill="#808080" d="M30.707,9.293L26,4.586V1c0-0.552-0.448-1-1-1H3C2.448,0,2,0.448,2,1v30c0,0.552,0.448,1,1,1h22c0.552,0,1-0.448,1-1V15.414l4.707-4.707C31.098,10.317,31.098,9.683,30.707,9.293z M11.921,17.628l4.452,4.452l-5.194,0.742L11.921,17.628z M17.146,21.439l-4.586-4.586l8.293-8.293l4.586,4.586L17.146,21.439z M26.146,12.439l-4.586-4.586L24,5.414v0L28.586,10L26.146,12.439z M4,30V2h20v2l-4,4H8v1h11l-2,2H8v1h8l-2,2H8v1h5l-1.764,1.764c-0.069,0.069-0.124,0.15-0.17,0.236H8v1h2.857l-0.286,2H8v1h2.429l-0.286,2H8v1h2l6.67-0.953c0.214-0.031,0.413-0.13,0.566-0.283L24,16v14H4z"></path>
        </g>
    </svg>
        </span>
      <!--end::Svg Icon-->
    </button>
`;}
  return button;
}

function ShowAllAplication() {
  $(".tnv-application-d-none").removeClass("d-none");
  var org_app_id = ""
  if ($("#org_app_prefixId").length > 0) {
    org_app_id = $("#org_app_prefixId").val();
  }
  $("#ShowAllAplicationBtnId").html(`<a href='${org_app_id}/account/overviews/'>Trang Tổng quan</a>`);
}

function AutoTrimInput() {
  $('input[type="text"]').change(function() {
    this.value = $.trim(this.value);
  });
}

$(document).ready(function() {
  AutoTrimInput();
})


$(window).on("load", function() {
  if (preloader) {
    preloader.remove();
  }
})

function BindActionButtonDaidv(
  arr_action,
  Id,
  currentRow,
  arr_views = null,
  request_user,
) {
  if (arr_action.length == 0) {
    return "";
  }
  action_html = `
    <td>
        <div class="btn-group w-100 mx-auto">
            <button type="button" class="btn  btn-outline-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only"><i class="fas fa-ellipsis-h"></i></span></button>
            <div class="dropdown-menu">
    `;
  arr_action.forEach((ac) => {
    console.log("field_checking", ac["field_checking"]);
    console.log("currentRow", currentRow);
    console.log(
      'currentRow[ac["field_checking"]]',
      currentRow[ac["field_checking"]],
    );
    console.log(
      "ket qua",
      currentRow[ac["field_checking"]] == ac["value_is_true"],
    );
    if ((!ac["value_is_true"] || ac["value_is_true"] == "false") && !currentRow.hasOwnProperty(ac["field_checking"])) {
      currentRow[ac["field_checking"]] = false;
    }
    if (arr_views != null && arr_views.length > 0) {
      if (
        ((
            ac["isCheck"] == true && // neu check
            currentRow[ac["field_checking"]] == ac["value_is_true"]) || // thi phai co gia tri tren ban ghi thoa man thi tra ve true
          ac["isCheck"] == false) && // neu khong check
        (arr_views.includes(ac["views_name"]) || // co quyen su dung action
          (currentRow["created_by__username"] == request_user && //hoac la nguoi tao ban ghi va allowSelfChecking =true
            ac["allowSelfChecking"]) ||
          ac['independent_views'] == true // hoac action nay khong phu thuoc vao views
        )
      ) {
        action_html +=
          '            <a class="dropdown-item d-flex align-items-center" uuid="' +
          Id +
          '" onclick="' +
          ac["func"] +
          "('" +
          Id +
          "')" +
          '">' +
          '               &nbsp;<i title="' +
          ac["title"] +
          '" class="' +
          ac["icon"] +
          '" onclick="' +
          ac["func"] +
          '"></i>&nbsp;' +
          "                " +
          ac["title"] +
          " </a>";
      }
    }
    // neu list view = null
    else {
      if (
        ((
            ac["isCheck"] == true &&
            currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
          ac["isCheck"] == false) &&
        (
          (currentRow["created_by__username"] == request_user &&
            ac["allowSelfChecking"]) || ac['independent_views'] == true
        )
      ) {
        action_html +=
          '            <a class="dropdown-item d-flex align-items-center" uuid="' +
          Id +
          '" onclick="' +
          ac["func"] +
          "('" +
          Id +
          "')" +
          '">' +
          '               &nbsp;<i title="' +
          ac["title"] +
          '" class="' +
          ac["icon"] +
          '" onclick="' +
          ac["func"] +
          '"></i>&nbsp;' +
          "                " +
          ac["title"] +
          " </a>";
      }

    }
  });
  action_html += ` </div>
    </div></td>`;
  return action_html;
}




function Handle_Input_Bigger_Than_Zero(input_id, save_id) {
  var save_button = document.getElementById(save_id);

  var input_button = document.getElementById(input_id);
  if (input_button != null && input_button != undefined && input_button != "") {
    input_button.addEventListener("input", function() {
      var inputValue = parseFloat(input_button.value);
      if (inputValue < 0) {
        input_button.classList.add("is-invalid");
        toastr.error("Bạn cần điền giá trị lớn hơn 0");
        save_button.disabled = true;
      } else {
        input_button.classList.remove("is-invalid");
        save_button.disabled = false;
      }
    });
  }
}


function Handle_Space_In_InputButton(input_id, save_id) {
  var save_button = document.getElementById(save_id);

  var input_button = document.getElementById(input_id);
  input_button.addEventListener("input", function() {
    if (input_button.value.trim().length <= 0) {
      input_button.classList.add("is-invalid");
      toastr.error("Bạn nhập giá trị là khoảng trống");
      save_button.disabled = true;
    } else {
      input_button.classList.remove("is-invalid");
      save_button.disabled = false;
    }
  });
}



function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  var donvi = " VNĐ"
  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") {
    return;
  }

  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      // right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    // input_val = "$" + left_side + "." + right_side  ;
    // input_val = left_side + "." + right_side + donvi;
    input_val = left_side + donvi;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val_number = formatNumber(input_val);
    // input_val = "$"+input_val;
    input_val = input_val_number + donvi;

    // final formatting
    if (blur === "blur") {
      // input_val_number += ".00";
      input_val = input_val_number + donvi;

    }
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

function formatCurrencyWithString(currency_str) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  var donvi = " VNĐ"
  // get input value
  var input_val = currency_str;

  // don't validate empty input
  if (input_val === "") {
    return;
  }

  // original length
  var original_len = input_val.length;

  input_val = formatNumber(input_val);
  input_val_number = formatNumber(input_val);
  // input_val = "$"+input_val;
  input_val = input_val_number + donvi;

  return input_val;
  // send updated string to input
}


function formatCurrencyForTable(currency_str) {
  if (currency_str.endsWith('.00')) {
    currency_str = currency_str.slice(0, -3)
  }
  return currency_str
}



function OnclickGetAllLevelDetail($this) {
  console.log($($this).is(':checked'))
  var this_div = $($this).closest('div');
  var name_field = $($this).attr('name_field');
  var this_select = this_div.find('select[name=' + name_field + ']');
  var this_select_id = this_select.attr('id')
  if ($($this).is(':checked') == true) {
    this_select.val($('#' + this_select_id + ' option').map(function() {
      return this.value;
    })).trigger('change.select2');
  } else {
    this_select.val(null).trigger('change.select2');
  }

}

$(document).ready(function() {
  $('.employees-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});


$(document).ready(function() {
  $('.employees-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.employees-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    }
  });
});



$(document).ready(function() {
  $('.leveldetail-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});


$(document).ready(function() {
  $('.leveldetail-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.leveldetail-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});

//Cuong
$(document).ready(function() {
  $('.campaign-select-all-multiple-data').on('select2:select', function(e) {
    if (e.params.data.id === 'all') {
      // Get all options except the empty one
      var options = $(this).children('option').filter(function() {
        return $(this).val() !== "";
      });

      // Set the value and trigger change event
      $(this).val($.map(options, function(option) { return option.value; })).trigger('change.select2');
    }
  });

  $('.campaign-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      // Deselect "all" option if it's not already deselected
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});


$(document).ready(function() {
  $('.title-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.title-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.title-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});

$(document).ready(function() {
  $('.policy-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.policy-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.policy-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});
$(document).ready(function() {
  $('.payrolltemplateimport-select-all').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});


$(document).ready(function() {
  $('.payrolltemplateimport-select-all').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.payrolltemplateimport-select-all').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});

$(document).ready(function() {
  $('.contracttype-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.contracttype-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.contracttype-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});

$(document).ready(function() {
  $('.welfare-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.welfare-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.welfare-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});

$(document).ready(function() {
  $('.contractsalarycomponent-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.contractsalarycomponent-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.contractsalarycomponent-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});

$(document).ready(function() {
  $('.hraccount-select-email-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});
$(document).ready(function() {
  $('.hraccount-select-email-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.hraccount-select-email-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});


$(document).ready(function() {
  $('.organizationalstructuremanagement-title-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.organizationalstructuremanagement-title-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.organizationalstructuremanagement-title-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});
$(document).ready(function() {
  $('.organizationalstructuremanagement-leveldetail-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.organizationalstructuremanagement-leveldetail-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.organizationalstructuremanagement-leveldetail-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});
$(document).ready(function() {
  $('.organizationalstructuremanagement-leveldetail-select-all-multiple-data-form-LeaveConfig').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.organizationalstructuremanagement-leveldetail-select-all-multiple-data-form-LeaveConfig').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.organizationalstructuremanagement-leveldetail-select-all-multiple-data-form-LeaveConfig').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});
$(document).ready(function() {
  $('.cabmanagement-policyleave-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.cabmanagement-policyleave-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.cabmanagement-policyleave-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});

$(document).ready(function() {
  $('.policyleave-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.policyleave-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.policyleave-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});

$(document).ready(function() {
  $('.position-select-all-multiple-data').select2({
    placeholder: '',
    width: '100%',
    border: '1px solid #e4e5e7',
  });
});

$(document).ready(function() {
  $('.position-select-all-multiple-data').on('select2:select', function(e) {
    // Check if "Select All" is selected
    if (e.params.data.id === 'all') {
      // Select all options except the "Select All" option
      $(this).val($(this).children('option').map(function() {
        return this.value;
      })).trigger('change.select2');
    }
  });
  $('.position-select-all-multiple-data').on('select2:unselect', function(e) {
    if (e.params.data.id === 'all') {
      // Deselect all options
      $(this).val(null).trigger('change.select2');
    } else {
      $(this).find('option[value="all"]').prop('selected', false);
      $(this).trigger('change.select2');
    }
  });
});


var count_connect_ws = 0;
var max_reconnect_ws = 10;

function connectHRM() {
  // var user_name = 'tnv';
  var user_id = $("#uuid_username_hraccount_hrm360").html();
  // noticeSocket = new WebSocket("ws://" + window.location.host + "/ws/notice-signal/" + roomName + "/");
  var loc = window.location,
    new_uri;

  if (loc.protocol === "https:") {
    new_uri = "wss";
  } else {
    new_uri = "ws";
  }
  if (new_uri == "ws") {
    var host_revice = '192.168.50.168:1201';
  } else {
    var host_revice = 'notice.hrm360.com.vn';
  }

  //    new_uri += "//" + loc.host;
  //    new_uri += loc.pathname + "/to/ws";
  if (noticeSocket == undefined || noticeSocket == null) {
    //  noticeSocket = new WebSocket(new_uri += ":http://0.0.0.0:8001/ws/user/" + user_id + "/notice/");
    // noticeSocket = new WebSocket(new_uri += "://" + window.location.host + "/ws/user/" + user_id + "/notice/");
    noticeSocket = new WebSocket(new_uri += "://" + host_revice + "/ws/user/" + user_id + "/notice/");
    noticeSocket.onopen = function(e) {
      // console.log("Successfully connected to the WebSocket.");
    }

    noticeSocket.onclose = function(e) {
      console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...");
      if (count_connect_ws <= max_reconnect_ws) {
        setTimeout(function() {
          console.log("Reconnecting...");
          count_connect_ws++;
          connectHRM();
        }, 2000);
      }
    };

    noticeSocket.onmessage = function(e) {
      const dataMessage = JSON.parse(e.data);
      const data = dataMessage.data
      // console.log(data)
      switch (data.type) {
        // case "chat_message":
        //     chatLog.value += data.message + "\n";
        //     break;
        case "user_notice":
          console.log(data)
          toastr.info(data.content, data.title);
          var out = `
            <a href="${data.link_connect}" id="${data.uuid}" class="dropdown-item d-flex flex-stack p-4 pe-3" >
                <!--begin::Details-->
                <div class="d-flex align-items-center">
                    <!--begin::Avatar-->
                    <div class="symbol symbol-50px symbol-circle ">
                        <span class="symbol-label bg-light-success text-success fs-6 fw-bolder">M</span>
                    </div>
                    <!--end::Avatar-->

                    <!--begin::Details-->
                    <div class="ms-5">
                        <div class="fw-bold text-truncate text-wrap text-gray-800 text-overflow fs-5 lh-sm">${data.name}
                          <span class="fw-semibold text-muted fs-8">${data.created_at}</span>
                        </div>
                        <span class="fw-quarterbold text-truncate text-wrap text-gray-600 text-overflow text-muted mt-1 mb-0">${data.content}</span>
                    </div>
                    <!--end::Details-->
                </div>
                <!--end::Details-->

                <!--begin::Last seen-->
                <div class="d-flex flex-column align-items-end w-10px h-10px mx-2">
                    <span class="badge badge-primary-base badge-circle w-10px h-10px"></span>
                </div>
                <!--end::Last seen-->
            </a>
            `;
          $('#hrm360_topbar_notifications').prepend(out);

          var total_crr_noti = $('#navbarNotificationBadge').text();
          total_crr_noti = parseInt(total_crr_noti) + 1;
          $('#navbarNotificationBadge').text(total_crr_noti);

          if ($('#navbarNotificationBadge').hasClass('d-none') == true) {
            $("#navbarNotificationBadge").removeClass('d-none');
          }
          break;

        case "admin_notice":
          toastr.info(data.content, data.title);
          var out = `
          <a href="${data.link_connect}" id="${data.uuid_noti}" class="dropdown-item d-flex flex-stack p-4 pe-3" >
              <!--begin::Details-->
              <div class="d-flex align-items-center">
                  <!--begin::Avatar-->
                  <div class="symbol symbol-50px symbol-circle ">
                      <span class="symbol-label bg-light-success text-success fs-6 fw-bolder">M</span>
                  </div>
                  <!--end::Avatar-->

                  <!--begin::Details-->
                  <div class="ms-5">
                      <div class="fw-bold text-truncate text-wrap text-gray-800 text-overflow fs-5 lh-sm">${data.name}
                        <span class="fw-semibold text-muted fs-8">${data.created_at}</span>
                      </div>
                      <span class="fw-quarterbold text-truncate text-wrap text-gray-600 text-overflow text-muted mt-1 mb-0">${data.content}</span>
                  </div>
                  <!--end::Details-->
              </div>
              <!--end::Details-->

              <!--begin::Last seen-->
              <div class="d-flex flex-column align-items-end w-10px h-10px mx-2">
                  <span class="badge badge-primary-base badge-circle w-10px h-10px"></span>
              </div>
              <!--end::Last seen-->
          </a>
          `;
          $('#hrm360_topbar_notifications').prepend(out);

          var total_crr_noti = $('#navbarNotificationBadge').text();
          total_crr_noti = parseInt(total_crr_noti) + 1;
          $('#navbarNotificationBadge').text(total_crr_noti);

          if ($('#navbarNotificationBadge').hasClass('d-none') == true) {
            $("#navbarNotificationBadge").removeClass('d-none');
          }
          break;
        default:
          console.error("Unknown message type!");
          break;
      }

      // scroll 'chatLog' to the bottom
      // chatLog.scrollTop = chatLog.scrollHeight;
    };

    noticeSocket.onerror = function(err) {
      console.log("WebSocket encountered an error: " + err.message);
      console.log("Closing the socket.");
      noticeSocket.close();
    }
  }
}

let noticeSocket = null;

$(document).ready(function() {
  connectHRM();
});


function formatMoney(input) {
  let inputValue = input.value;
  let numericValue = formatNumber(inputValue);
  input.value = numericValue;
}


function formatMoneyDiv(input) {
  let inputValue = input.innerHTML;
  if (inputValue != "") {
    let numericValue = formatNumber(inputValue);
    input.innerHTML = numericValue;
  }
}


function formatNumberDecimal(input) {
  if (input == null || input == "" || input == undefined) {
    return 0;
  }

  // Chuyển đổi input thành số thập phân
  const decimal = parseFloat(input);

  // Kiểm tra nếu có 2 số sau dấu thập phân
  if (decimal % 1 === 0) {
    return decimal.toString(); // Nếu .00 thì bỏ
  } else {
    // Xóa số 0 sau dấu thập phân nếu có
    const formattedDecimal = decimal.toString().replace(/\.0+$/, '');

    return formattedDecimal;
  }
}


function formatNumber(n) {
  var i = ''
  var r = n
  // if (n.includes('.')) {
  //   a = n.split('.')
  //   if (a.length <= 2) {
  //     i = a[a.length - 1]
  //     r = n.slice(0, n.length - i.length - 1)
  //   }
  // }
  if (n[0] == "-") {
    val = "-" + r.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  } else {
    val = r.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  // if (i != '') {
  //   val = val + "," + i
  // }
  return val;
  // if (n[0] == "-") {
  //   // Đối với số âm, giữ dấu trừ, chuyển đổi thành số nguyên và định dạng
  //   return "-" + parseInt(n.replace(/[^\d,]/g, ""), 10).toLocaleString('vi');
  // } else {
  //   // Đối với số dương, chuyển đổi thành số nguyên và định dạng
  //   return parseInt(n.replace(/[^\d,]/g, ""), 10).toLocaleString('vi');
  // }
}


function addEventFormatMoney() {
  $("input[data-type='currency']").on("keyup", function() {
    formatMoney(this)
  })
  // $("input[data-type='currency']").change(function() {
  //   formatMoney(this)
  // })
}
addEventFormatMoney()


function Handle_Input_Friendly_code(input_id) {
  var input_button = document.getElementById(input_id);
  input_button.addEventListener("input", function() {
    var inputValue = input_button.value;
    if (inputValue.includes(' ')) {
      input_button.classList.add("is-invalid");
      toastr.error("Mã không được có khoảng trống hoặc dấu cách");
    } else {
      input_button.classList.remove("is-invalid");
    }
  });
}


function validateFriendlyCode(value) {
  // Kiểm tra xem giá trị có chứa khoảng trắng hay không
  if (value.includes(' ')) {
    return false
  } else {
    return true
  }
}

function hasDuplicateValues(arr1, arr2, arr3, arr4) {
  const allValues = [...arr1, ...arr2, ...arr3, ...arr4];
  const uniqueValues = new Set(allValues);

  return uniqueValues.size !== allValues.length;
}

function getShortName(input) {
  if (input == null || input == "") {
    return "";
  } else {
    var short_name = input.split(' ').map(n => n[0]).join('');
    short_name = short_name[short_name.length - 1];
    return short_name;
  }
}

// Function kiểm tra giá trị đầu vào có phải là các giá trị "falsy": 0, false, undefined, null, '', NaN
function isEmptyOrUndefined(value) {
  return !value;
}


function resizeSVG(svgString, newWidth, newHeight) {
  // Tạo một đối tượng DOM từ chuỗi SVG đầu vào
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

  // Lấy thẻ SVG từ tài liệu SVG
  const svgElement = svgDoc.documentElement;

  // Thay đổi kích thước của SVG
  svgElement.setAttribute('width', newWidth);
  svgElement.setAttribute('height', newHeight);

  // Trả về chuỗi SVG đã được thay đổi kích thước
  return svgElement.outerHTML;
}

function string2aryay(input){

}

$(document).ready(function(){
  
  $.ajaxSetup({
    // beforeSend: function(xhr, settings) {
    //     if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
    //         xhr.setRequestHeader("X-CSRFToken", csrftoken);
    //     }
    
    // },
  beforeSend: function(jqXHR, settings) {
        jqXHR.url = settings.url;
    },
  error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      if(jqXHR.hasOwnProperty("responseJSON") && jqXHR.responseJSON.hasOwnProperty("status_code")){
          if (jqXHR.responseJSON.status_code === 403) {
            if (jqXHR.status === 403) {
                toastr.warning('Bạn không có quyền thực hiện thao tác này!');
            }
        }
      }
  },
  success: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      if(jqXHR.hasOwnProperty("responseJSON") && jqXHR.responseJSON.hasOwnProperty("status_code")){
        if (jqXHR.responseJSON.status_code === 403) {
            toastr.warning('Bạn không có quyền thực hiện thao tác này!');
        }
      }
  },
    complete: function(jqXHR, textStatus, errorThrown) {

      // console.log(jqXHR);
      if(jqXHR.hasOwnProperty("responseJSON") && jqXHR.responseJSON.hasOwnProperty("status_code")){
        if (jqXHR.responseJSON.status_code === 403) {
          // switch(expression) {
          //   case x:
          //     // code block
          //     break;
          //   case y:
          //     // code block
          //     break;
          //   default:
          //     // code block
          // }
          if (jqXHR.url.includes("/search/")){
            toastr.warning('Bạn không có quyền tìm kiếm dữ liệu!');

          }
          else if (jqXHR.url.includes("/table/")){
            toastr.warning('Bạn không có quyền lấy danh sách!');

          }
          else if (jqXHR.url.includes("/filter/")){
            toastr.warning('Bạn không có quyền lọc dữ liệu!');

          } 
          else if (jqXHR.url.includes("/import-file/")){
            toastr.warning('Bạn không có quyền tải tệp lên hệ thống!');

          }
          else if (jqXHR.url.includes("/import-file/")){
            toastr.warning('Bạn không có quyền tải tệp lên hệ thống!');

          }
          else {
            toastr.warning('Bạn không có quyền thực hiện thao tác này!');
          }
        }
      }
      
      else if (jqXHR.status == 401){
        if (jqXHR.url.includes("/search/")){
          toastr.warning('Bạn không có quyền tìm kiếm dữ liệu!');

        }
        else if (jqXHR.url.includes("/table/")){
          toastr.warning('Bạn không có quyền lấy danh sách!');

        }
        else if (jqXHR.url.includes("/filter/")){
          toastr.warning('Bạn không có quyền lọc dữ liệu!');

        } 
        else if (jqXHR.url.includes("/import-file/")){
          toastr.warning('Bạn không có quyền tải tệp lên hệ thống!');

        }
        else if (jqXHR.url.includes("/import-file/")){
          toastr.warning('Bạn không có quyền tải tệp lên hệ thống!');

        }
        else {
          toastr.warning('Bạn không có quyền thực hiện thao tác này!');
        }
      }

    }
    
  })
})