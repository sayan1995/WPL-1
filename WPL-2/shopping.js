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

    function search(term, data, event) {
        var searchList = [];
        for (var i = 0; i < orderList.length; i++) {
            if (data == "date") {
                if (orderList[i][data].replace('00:00:00 GMT-0600', '').toLowerCase().indexOf(term) != -1) {
                    console.log(orderList[i][data]);
                    console.log(orderList[i][data].toLowerCase().indexOf(term));
                    searchList.push(orderList[i]);
                } else {

                }
            } else {
                if ((orderList[i][data]).toLowerCase().indexOf(term) != -1) {
                    console.log(orderList[i][data]);
                    console.log(orderList[i][data].toLowerCase().indexOf(term));
                    searchList.push(orderList[i]);
                    //$('#row-' + (i + 1)).show();
                    //$('#row-' + (i + 1)).addClass('active');
                } else {
                    //$('#row-' + (i + 1)).hide();
                    //$('#row-' + (i + 1)).removeClass('active');
                }
            }
        }
        console.log(searchList);
        sortList = searchList;

        display(searchList);
    }

    function filterListeners() {
        $('.glyphicon-filter').click(function() {
            if ($(this).hasClass('number-filter')) {
                $('#numberF').toggle();
            } else if ($(this).hasClass('desc-filter')) {
                $('#descF').toggle();
            } else if ($(this).hasClass('dd-filter')) {
                $('#dateF').toggle();
            } else {
                $('#priceF').toggle();
            }

        });

        $('.filterBox').keyup(function(event) {
            search($(this).val(), $(this).attr('data'), event);
        });
    }
    /*call functions*/
    display(orderList);
    sortFields();
    filterListeners();

});