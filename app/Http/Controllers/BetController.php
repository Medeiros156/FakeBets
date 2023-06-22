<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use App\Models\GameApi;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class BetController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'teamBet' => 'required',
            'amountBet' => 'required|numeric',
            'gameId' => 'required|numeric',
            'userEmail' => 'required',
            'oddsValue' => 'required|numeric',
        ]);

        // Make the POST request using GameApi model
        $response = GameApi::createBet($validatedData);

        // Check the response status
        if ($response['statusCode'] === 200) {
            // The request was successful
            // Handle the response data as needed

            return response()->json(['message' => 'Bet created successfully']);
        } else {
            // The request failed
            return response()->json(['error' => $response['body']], $response['statusCode']);
        }
    }

    public function getBets(Request $request)
    {
        $userEmail = Auth::user()->email;
        $bets = GameApi::bet_history($userEmail); // Fetch games data from the API

        return Inertia::render('Bet/Bet_history', [
            'bets' => $bets
        ]);
    }
    public function getTotalBets(Request $request)
    {
        $userEmail = Auth::user()->email;
        $bets = GameApi::bet_total($userEmail); // Fetch games data from the API

        return response()->json([
            'bets' => $bets,
        ]);
    }

    public function getUser(Request $request)
    {
        $userEmail = Auth::user()->email;
        $user = GameApi::getUserData($userEmail); // Fetch games data from the API

        return response()->json([
            'user' => $user,
        ]);
    }
    public function getTop5(Request $request)
    {
        $top = GameApi::getTopBetters(); // Fetch games data from the API
        // return Inertia::render('_Home', [
        //     'top_betters' => $top
        // ]);
        return Inertia::render('_Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'top_betters' => $top
        ]);

    }




}