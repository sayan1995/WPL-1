$(document).ready(function() {
    var sortList = orderList;

    function tableEventListener() {
        $('.orderRow').mouseenter(function() {
            $(this).css('background-color', '#dee4e7');
        });

        $('.orderRow').mouseleave(function() {
            $(this).css('background-color', '#fff');
        });
    }

    function display(orders) {
        $('.orderTable').empty();
        $('.entries').text(orders.length);
        for (var i = 0; i < orders.length; i++) {
            console.log("s");
            var row = '<tr class="orderRow" id="row-' + (i + 1) + '"></tr>';
            $('.orderTable').append(row);
            var data = "<td>" + orders[i].number + "</td>";
            data = data + "<td>" + orders[i].description + "</td>";
            data = data + "<td>" + (orders[i].date).replace('00:00:00 GMT-0600', '').replace(' ', ', ') + "</td>";
            data = data + "<td>" + orders[i].price + "</td>";
            $('#row-' + (i + 1)).append(data);
        }

        tableEventListener();
    }

    function sortFields() {

        $('.number-sort').click(function() {
            var orderList = sortList;
            if ($(this).hasClass('asc')) {
                $(this).removeClass('asc');
                orderList.sort(function(a, b) {
                    var temp = (a.number).replace('#', '');
                    var temp1 = (b.number).replace('#', '');
                    return temp1 - temp;
                });
                display(orderList);
            } else {
                $(this).addClass('asc');
                orderList.sort(function(a, b) {
                    var temp = (a.number).replace('#', '');
                    var temp1 = (b.number).replace('#', '');
                    return temp - temp1;
                });
                display(orderList);
            }
        });

        $('.desc-sort').click(function() {
            var orderList = sortList;
            if ($(this).hasClass('asc')) {
                $(this).removeClass('asc');
                orderList.sort(function(a, b) {
                    if (a.description > b.description) {
                        return -1;
                    }
                    return 0;
                });
                display(orderList);
            } else {
                $(this).addClass('asc');
                orderList.sort(function(a, b) {
                    if (b.description > a.description) {
                        return -1;
                    }
                    return 0;
                });
                display(orderList);
            }
        });

        $('.dd-sort').click(function() {
            var orderList = sortList;
            if ($(this).hasClass('asc')) {
                $(this).removeClass('asc');
                orderList.sort(function(a, b) {
                    var temp = new Date(a.date);
                    var temp1 = new Date(b.date);
                    return temp1 - temp;
                });
                display(orderList);
            } else {
                $(this).addClass('asc');
                orderList.sort(function(a, b) {
                    var temp = new Date(a.date);
                    var temp1 = new Date(b.date);
                    return temp - temp1;
                });
                display(orderList);
            }
        });

        $('.tp-sort').click(function() {
            var orderList = sortList;
            if ($(this).hasClass('asc')) {
                $(this).removeClass('asc');
                orderList.sort(function(a, b) {
                    var temp = (a.price).replace('$', '');
                    var temp1 = (b.price).replace('$', '');
                    return temp1 - temp;
                });
                display(orderList);
            } else {
                $(this).addClass('asc');
                orderList.sort(function(a, b) {
                    var temp = (a.price).replace('$', '');
                    var temp1 = (b.price).replace('$', '');
                    return temp - temp1;
                });
                display(orderList);
            }
        });

    }


    function search(term, data, dataList) {

        var searchList = [];
        var searchOrderList = orderList;
        for (var i = 0; i < searchOrderList.length; i++) {
            var flag = true;
            for (var j = 0; j < dataList.length; j++) {
                if (dataList[j].column == "date") {
                    if (searchOrderList[i][dataList[j].column].replace('00:00:00 GMT-0600', '').toLowerCase().indexOf(dataList[j].term) != -1) {
                        flag = flag && true;
                    } else {
                        flag = flag && false;
                    }
                } else {
                    if ((searchOrderList[i][dataList[j].column]).toLowerCase().indexOf(dataList[j].term) != -1) {
                        flag = flag && true;
                        //$('#row-' + (i + 1)).show();
                        //$('#row-' + (i + 1)).addClass('active');
                    } else {
                        flag = flag && false;
                        //$('#row-' + (i + 1)).hide();
                        //$('#row-' + (i + 1)).removeClass('active');
                    }
                }
            }
            if (flag == true) {
                searchList.push(searchOrderList[i]);
            }

        }
        searchList = searchList.filter(function(item, pos) {
            return searchList.indexOf(item) == pos;
        })
        console.log(searchList);
        sortList = searchList;

        display(searchList);
    }

    function filterListeners() {
        $('.glyphicon-filter').click(function() {
            if ($(this).hasClass('number-filter')) {
                $('#numberF').toggleClass('active');
                $('#numberF').toggle();
            } else if ($(this).hasClass('desc-filter')) {
                $('#descF').toggleClass('active');
                $('#descF').toggle();
            } else if ($(this).hasClass('dd-filter')) {
                $('#dateF').toggleClass('active');
                $('#dateF').toggle();
            } else {
                $('#priceF').toggleClass('active');
                $('#priceF').toggle();
            }

        });

        $('.filterBox').keyup(function(event) {
            var list = $('.filterBox');
            var index = 0;
            var flag = false;
            var dataList = [];
            for (var i = 0; i < list.length; i++) {
                if ($(list[i]).hasClass('active')) {
                    dataList.push({
                        "column": $(list[i]).attr('data'),
                        "term": $(list[i]).val()
                    });
                }
            }
            console.log(dataList);
            if (index > 1) {
                flag = true;
            } else {
                flag = false
            }

            search($(this).val(), $(this).attr('data'), dataList);
        });
    }
    /*call functions*/
    display(orderList);
    sortFields();
    filterListeners();

});