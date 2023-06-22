<?php

namespace App\Http\Controllers;

use App\Models\GameApi;
use Inertia\Inertia;

class GamesController extends Controller
{
    public function getGames()
    {
        $games = GameApi::all(); // Fetch games data from the API

        return Inertia::render('Games/Games', [
            'games' => $games
        ]);
    }
    public function getHistory()
    {
        $games = GameApi::history(); // Fetch games data from the API

        return Inertia::render('Games/Games_history', [
            'games' => $games
        ]);
    }

}