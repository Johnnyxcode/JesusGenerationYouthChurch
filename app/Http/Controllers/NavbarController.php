<?php

namespace App\Http\Controllers;

use App\Traits\SearchableController;
use App\Models\{
    Category, Tab, Post, Children, Usher, Protocol, Choir, Event, Gallery, Giving, Sermon
};
use Illuminate\Http\Request;


class NavbarController extends Controller
{

  use SearchableController;
  
  public function Index()
    {  
       
      return view('index');
            
    }

    public function About()
  {  
    return view('about-us.index');
  }  

  public function Events()
  {  
    // $Event = Event::all();
    // return view('events.index', compact('Event'));

    $Event = Event::latest()->filter(request(['search']))->get();
    return view('events.index', compact('Event'));
  }  

  public function ThanksGiving()
  {  
    
    return view('event.thanks-giving-service.index', compact('Giving'));
  }  
  
  public function Contactus()
  {
    return view('contact-us.index');
  }

  public function Tithe()
  {
    $Giving = Giving::all();
    return view('tithe&offering.index', compact('Giving'));
  }

  public function Pastors()
  {
    return view('our-pastors.index');
  }

  public function Children()
  
  {
    // $Children = Children::all();
    // return view('department.childrens-department.index', compact('Children'));

    $Children = Children::latest()->filter(request(['search']))->get();
    return view('department.childrens-department.index', compact('Children'));
  }
  
  public function Protocol()
  
  {
    $Protocol = Protocol::all();
    return view('department.protocol-department.index', compact('Protocol'));
  }

  public function Ushering()
  {
    $Usher = Usher::all();
    return view('department.ushering-department.index', compact('Usher'));
  }

  public function Choir()
  {
    $Choir = Choir::all();
    return view('department.choir-department.index', compact('Choir'));
  }
  
  public function Blog()
  {
    return view('blog.index');
  }
   
  public function Evangelism()
  {
    return view('evangelism.index');
  }
   
  public function Sermon()
  {
    $Sermon = Sermon::all();
    return view('sermon.index', compact('Sermon'));
  }

  public function Image()
  {
    $Gallery = Gallery::all();
    return view('image.index', compact('Gallery'));
  }
  
  public function Video()
  {
    $Gallery = Gallery::all();
    return view('video.index', compact('Gallery'));
  }
  
  public function Audio()
  {
    $Gallery = Gallery::all();
    return view('audio.index', compact('Gallery'));
  }
  

    
}