package controllers;

import play.*;
import play.mvc.*;
import play.data.validation.Required;

import java.util.*;

import models.*;

public class WebEditor extends Controller {

    public static void index() {
        render();
    }

    public static void upload() {
    	render();
    }

    public static void download() {
    	render();
    }
}