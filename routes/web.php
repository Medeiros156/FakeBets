<?php

use App\Http\Controllers\GamesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BetController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return Inertia::render('_Home', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});


// Route::get('/home', function () {
//     return Inertia::render('_Home', []);
// })->middleware(['auth', 'verified'])->name('_Home');

Route::get('/', [BetController::class, 'getTop5']);



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');




Route::get('/games', [GamesController::class, 'getGames'])
    ->middleware(['auth', 'verified'])
    ->name('games');



Route::get('/history', [GamesController::class, 'getHistory'])
    ->middleware(['auth', 'verified'])
    ->name('history');

Route::get('/bets', [BetController::class, 'getBets'])
    ->middleware(['auth', 'verified'])
    ->name('bets');

Route::get('/wallet', [BetController::class, 'getUser'])
    ->middleware(['auth', 'verified'])
    ->name('wallet');

Route::get('/totalBets', [BetController::class, 'getTotalBets'])
    ->middleware(['auth', 'verified'])
    ->name('totalBets');



Route::get('/bet/confirmation', function (Illuminate\Http\Request $request) {
    $oddsValue = $request->query('oddsValue');
    $oddTeam = $request->query('oddTeam');
    $teamA = $request->query('teamA');
    $teamB = $request->query('teamB');
    $gameId = $request->query('gameId');
    $value = $request->query('value');
    return Inertia::render('Bet/Bet_confirmation', [
        'oddsValue' => $oddsValue,
        'oddTeam' => $oddTeam,
        'teamA' => $teamA,
        'teamB' => $teamB,
        'gameId' => $gameId,
        'value' => $value,
    ]);
})->middleware(['auth', 'verified'])->name('bet/confirmation');


Route::get('/bet/{oddsA}', function ($oddsA, Illuminate\Http\Request $request) {
    // $oddsA = $request->query('oddsA');
    $oddsDraw = $request->query('oddsDraw');
    $oddsB = $request->query('oddsB');
    $teamA = $request->query('teamA');
    $teamB = $request->query('teamB');
    $gameId = $request->query('gameId');
    $oddsSelected = $request->query('oddsSelected');
    $oddsSelectedValue = $request->query('oddsSelectedValue');

    return Inertia::render('Bet/Bet', [
        'oddsA' => $oddsA,
        'oddsDraw' => $oddsDraw,
        'oddsB' => $oddsB,
        'teamA' => $teamA,
        'teamB' => $teamB,
        'gameId' => $gameId,
        'oddsSelected' => $oddsSelected,
        'oddsSelectedValue' => $oddsSelectedValue,

    ]);
})->middleware(['auth', 'verified'])->name('bet');



Route::post('/betpost', [BetController::class, 'store'])->middleware(['auth', 'verified'])->name('betpost');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';