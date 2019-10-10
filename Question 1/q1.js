$(document).ready(function() {
    $(".cert").click(function() {
        if ($(this).attr("id") == "c1") {
            $("#" + $(this).attr("id") + "-clink").hide("1000");
        } else if ($(this).attr("id") == "c2") {
            $("#" + $(this).attr("id") + "-clink").show("1000");
        } else {
            $("#" + $(this).attr("id") + "-clink").toggle("1000");
        }
    });

    var flag = true;
    $("#check").bind('click', function() {
        $("#meet").toggle();
        if (flag == true) {
            $("#meet").attr("required", "true");
            flag = false;
        } else {
            flag = true;
            $("#meet").removeAttr("required");
        }
    });

    $(".course").dblclick(function() {
        if ($(this).attr("id") == "cName-1") {
            $("#" + $(this).attr("id") + " div").fadeToggle("1000");
        } else if ($(this).attr("id") == "cName-2") {
            $("#" + $(this).attr("id") + " div").fadeTo("1000", 0.5);
        } else {
            $("#" + $(this).attr("id") + " div").fadeOut("1000");
        }
    });

    $("#history").mouseenter(function() {
        $("#animation").show();
        $("#animation").addClass('start');
        animate();
    });

    var animeFlag = true;

    function animate() {
        $("#animation").animate({
            left: '850px',
            height: '90px'
        }, "slow");
        $("#animation").animate({
            top: '600px',
            width: '200px',
            height: '103px'
        }, "slow");
        $("#animation").animate({
            left: '550px',
            height: '90px',
            width: '103px'
        }, "fast");
        $("#animation").animate({
                top: '450px',
                height: '70px',
                width: '103px'
            }, "fast",
            function() {
                $("#animation").hide();
                if (animeFlag) {
                    $('#uEd').append('<li>National Public School - Physic, Chemisty and Computer Science Track </li>');
                    animeFlag = false;
                }
                alert("Done!");
            });
    }
    $("#history").mouseleave(function() {
        $("#animation").hide();
        $("#animation").stop(false, true);
    });

    $("#desc").keypress(function() {
        var current = $(this).val();
        if (current.length < 5) {
            $("#nameV").fadeIn(1000).fadeOut(1000).fadeTo(1000, 0.9);
        }
    });

    $("#nameB").keypress(function() {
        $("#animation2").show();
        $("#animation2").animate({
            fontSize: '30px'
        }, 800).animate({
            fontSize: '20px'
        }, 800, function() {
            $("#animation2").text('Almost Done!...')
        }).animate({
            fontSize: '30px'
        }, 1000, function() {
            $("#animation2").text('You have not contacted me!')
        }).animate({
            fontSize: '20px'
        }, 1000, function() {
            $("#animation2").hide();
            $("#animation2").text('Checking if you have contacted me before ..')
        });

    });
});