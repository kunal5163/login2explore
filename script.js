var token = '90932333|-31949271199044522|90953750';
var dbname = 'COLLEGE-DB';
var relation = "PROJECT-TABLE";
var baseUrl = "http://api.login2explore.com:5577";
function resetForm() {
    $("#project-id").val('')
    $("#project-name").val('');
    $("#assigned-to").val('');
    $("#assignment-date").val('');
    $("#deadline").val('');
}

function disableAll() {
    resetForm();
    $("#project-id").prop("disabled", false);
    $("#project-id").focus();
    $("#project-name").prop("disabled", true);
    $("#assigned-to").prop("disabled", true);
    $("#assignment-date").prop("disabled", true);
    $("#deadline").prop("disabled", true);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
}
disableAll();
function executeCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
    if (createTime !== undefined) {
        if (createTime !== true) {
            createTime = false;
        }
    } else {
        createTime = false;
    }
    if (updateTime !== undefined) {
        if (updateTime !== true) {
            updateTime = false;
        }
    } else {
        updateTime = false;
    }
    var value1 = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + relationName
            + "\",\n"
            + "\"jsonStr\":\n"
            + jsonObjStr
            + "\,"
            + "\"createTime\":"
            + createTime
            + "\,"
            + "\"updateTime\":"
            + updateTime
            + "\n"
            + "}";
    return value1;
}

function findid(ele) {
    var id = ele.value;
    var obj = {
        Project_id: id
    };
    var jsnobj = JSON.stringify(obj);
    var request = createGET_BY_KEYRequest(token, dbname, relation, jsnobj);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(request, "/api/irl");
    jQuery.ajaxSetup({ async: true });
    if (res.status == 400) {
        $("#project-name").prop("disabled", false);
        $("#project-name").focus();
        $("#assigned-to").prop("disabled", false);
        $("#assignment-date").prop("disabled", false);
        $("#deadline").prop("disabled", false);
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
    } else {
        $("#project-name").prop("disabled", false);
        $("#project-id").prop("disabled", true);
        $("#assigned-to").prop("disabled", false);
        $("#assignment-date").prop("disabled", false);
        $("#deadline").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        // console.log(res);
        var data = JSON.parse(res.data).record;
        // console.log(data);
        $("#project-name").val(data.Project_name);
        $("#assigned-to").val(data.Assighned_to);
        $("#assignment-date").val(data.Assignment_date);
        $("#deadline").val(data.Deadline);
    }
}
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}
function saveData() {
    $("#ajax").html("wait");
    var id = $("#project-id").val();
    var name = $("#project-name").val()
    var person = $("#assigned-to").val();
    var start_date = $("#assignment-date").val();
    var end_date = $("#deadline").val();
    if(id==''){
        $("#project-id").focus();
        return;
    }
    if(name==''){
        $("#project-name").focus();
        return;
    }if(person==''){
        $("#assigned-to").focus();
        return;
    }if(start_date==''){
        $("#assignment-date").focus();
        return;
    }if(end_date==''){
        $("#deadline").focus();
        return;
    }
    var obj = {
        Project_id: id,
        Project_name: name,
        Assighned_to: person,
        Assignment_date: start_date,
        Deadline: end_date
    };
    var jsonobj = JSON.stringify(obj);
    var req = createPUTRequest(token, jsonobj, dbname, relation);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}
function createSETRequest(token, jsonStr, dbName, relName, type, primaryKey, uniqueKeys, foreignKeys) {
    if (type === undefined) {
        type = "DEFAULT";
    }
    var req = {
        token: token,
        cmd: "SET",
        dbName: dbName,
        rel: relName,
        type: type,
        jsonStr: JSON.parse(jsonStr)
    };
    if (primaryKey !== undefined) {
        req.primaryKey = primaryKey;
    }
    if (uniqueKeys !== undefined) {
        req.uniqueKeys = uniqueKeys;
    }
    if (foreignKeys !== undefined) {
        req.foreignKeys = foreignKeys;
    }
    req = JSON.stringify(req);
    return req;
}

function updateData(){
    var id = $("#project-id").val();
    var name = $("#project-name").val()
    var person = $("#assigned-to").val();
    var start_date = $("#assignment-date").val();
    var end_date = $("#deadline").val();
    if(name==''){
        $("#project-name").focus();
        return;
    }if(person==''){
        $("#assigned-to").focus();
        return;
    }if(start_date==''){
        $("#assignment-date").focus();
        return;
    }if(end_date==''){
        $("#deadline").focus();
        return;
    }
    var obj = {
        Project_id: id,
        Project_name: name,
        Assighned_to: person,
        Assignment_date: start_date,
        Deadline: end_date
    };
    var jsonobj = JSON.stringify(obj);
    var req=createSETRequest(token,jsonobj,dbname,relation,'UPDATE','Project_id');
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml/set");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}