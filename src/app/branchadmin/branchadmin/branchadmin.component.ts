import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branchadmin',
  templateUrl: './branchadmin.component.html',
  styleUrls: ['./branchadmin.component.css']
})
export class BranchadminComponent implements OnInit {
    branchId;
  constructor() { 
    this.branchId = sessionStorage.getItem('branchId');
  }

    ngOnInit() {

        $(function () {
            "use strict";

            $(".preloader").fadeOut();

            $(".left-sidebar").hover(
                function () {
                    $(".navbar-header").addClass("expand-logo");
                },
                function () {
                    $(".navbar-header").removeClass("expand-logo");
                }
            );
            // this is for close icon when navigation open in mobile view
            $(".nav-toggler").on('click', function () {
                $("#main-wrapper").toggleClass("show-sidebar");
                $(".nav-toggler i").toggleClass("ti-menu");
            });
            $(".nav-lock").on('click', function () {
                $("body").toggleClass("lock-nav");
                $(".nav-lock i").toggleClass("mdi-toggle-switch-off");
                $("body, .page-wrapper").trigger("resize");
            });
            $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
                $(".app-search").toggle(200);
                $(".app-search input").focus();
            });

            $(function () {
                $(".service-panel-toggle").on('click', function () {
                    $(".customizer").toggleClass('show-service-panel');

                });
                $('.page-wrapper').on('click', function () {
                    $(".customizer").removeClass('show-service-panel');
                });
            });

            $("body, .page-wrapper").trigger("resize");
            $(".page-wrapper").delay(20).show();

            $(".list-task li label").click(function () {
                $(this).toggleClass("task-done");
            });

            var setsidebartype = function () {
                var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
                if (width < 1170) {
                    $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                } else {
                    $("#main-wrapper").attr("data-sidebartype", "full");
                }
            };
            $(window).ready(setsidebartype);
            $(window).on("resize", setsidebartype);
            //****************************
            /* This is for sidebartoggler*/
            //****************************
            $('.sidebartoggler').on("click", function () {
                $("#main-wrapper").toggleClass("mini-sidebar");
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $(".sidebartoggler").prop("checked", !0);
                    $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                } else {
                    $(".sidebartoggler").prop("checked", !1);
                    $("#main-wrapper").attr("data-sidebartype", "full");
                }
            });
        });
    }

    logOut(){
        sessionStorage.clear();
    }
}
