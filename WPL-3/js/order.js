$(document).ready(function() {
    var sortList = orderList;

    /*function to change the color of the table row on mousenter and mouse leave*/
    function tableEventListener() {
        $('.orderRow').mouseenter(function() {
            $(this).css('background-color', '#dee4e7');
        });

        $('.orderRow').mouseleave(function() {
            $(this).css('background-color', '#fff');
        });
    }

    /*function to create table from javascript object*/
    function display(orders) {
        $('.orderTable').empty();
        $('.entries').text(orders.length);
        for (var i = 0; i < orders.length; i++) {
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

    /*functions which contain eventlistener for sorting table values*/
    function sortFields() {

        /*sort by the order number*/
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

        /*sort by the description*/
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

        /*sort by date */
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

        /*sort by price*/
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


    /*function to filter based on a term in a column*/
    function search(term, data, dataList) {

        var searchList = [];
        var searchOrderList = orderList;
        for (var i = 0; i < searchOrderList.length; i++) {
            var flag = true;
            for (var j = 0; j < dataList.length; j++) {
                if (dataList[j].column == "date") {
                    if (searchOrderList[i][dataList[j].column].replace('00:00:00 GMT-0600', '').toLowerCase().indexOf((dataList[j].term).toLowerCase()) != -1) {
                        flag = flag && true;
                    } else {
                        flag = flag && false;
                    }
                } else {
                    if ((searchOrderList[i][dataList[j].column]).toLowerCase().indexOf((dataList[j].term).toLowerCase()) != -1) {
                        flag = flag && true;
                    } else {
                        flag = flag && false;
                    }
                }
            }
            if (flag == true) {
                searchList.push(searchOrderList[i]);
            }

        }

        sortList = searchList;

        display(searchList);
    }

    /*functions which contain Event listener to click on filter*/
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