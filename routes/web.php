<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NavbarController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::any('/index', [NavbarController::class, 'Index'])->name('index');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


Route::any('/about-us/index', [NavbarController::class, 'About'])->name('about-us.index');

Route::any('/events/index', [NavbarController::class, 'Events'])->name('events.index');

Route::any('/event/thanks-giving-service/index', [NavbarController::class, 'ThanksGiving'])->name('event.thanks-giving-service.index');

Route::any('/contact-us/index', [NavbarController::class, 'Contactus'])->name('contact-us.index');

Route::any('/tithe&offering/index', [NavbarController::class, 'Tithe'])->name('tithe&offering.index');

Route::any('/our-pastors/index', [NavbarController::class, 'Pastors'])->name('our-pastors.index');

Route::any('/department/childrens-department/index', [NavbarController::class, 'Children'])->name('department.childrens-department.index');

Route::any('/department/protocol-department/index', [NavbarController::class, 'Protocol'])->name('department.protocol-department.index');

Route::any('/department/ushering-department/index', [NavbarController::class, 'Ushering'])->name('department.ushering-department.index');

Route::any('/department/choir-department/index', [NavbarController::class, 'Choir'])->name('department.choir-department.index');

Route::any('/blog/index', [NavbarController::class, 'Blog'])->name('blog.index');

Route::any('/evangelism/index', [NavbarController::class, 'Evangelism'])->name('evangelism.index');

Route::any('/sermon/index', [NavbarController::class, 'Sermon'])->name('sermon.index');

Route::any('/image/index', [NavbarController::class, 'Image'])->name('image.index');

Route::any('/video/index', [NavbarController::class, 'Video'])->name('video.index');

Route::any('/audio/index', [NavbarController::class, 'Audio'])->name('audio.index');

Route::any('/search/index', [SearchController::class, 'Search'])->name('search.index');