<?php

namespace App\Models;

use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Client;

class GameApi
{

    public static function all()
    {
        $games = Cache::remember('all_games', 3600, function () {
            $client = new Client();
            $response = $client->get('http://localhost:3000/games');

            if ($response->getStatusCode() !== 200) {
                // Handle the API request failure
                return [];
            }

            return json_decode($response->getBody(), true);
        });

        return $games;
    }



    public static function history()
    {
        $games = Cache::remember('history_games', 3600, function () {
            $client = new Client();
            $response = $client->get('http://localhost:3000/games/history');

            if ($response->getStatusCode() !== 200) {
                // Handle the API request failure
                return [];
            }

            return json_decode($response->getBody(), true);
        });

        return $games;
    }

    public static function bet_history($userEmail)
    {
        $client = new Client();
        $response = $client->get("http://localhost:3000/bets/user/{$userEmail}");


        if ($response->getStatusCode() !== 200) {
            // Handle the API request failure
            return [];
        }

        $games = json_decode($response->getBody(), true);

        return $games;
    }

    public static function bet_total($userEmail)
    {
        $client = new Client();
        $response = $client->get("http://localhost:3000/bets/total/{$userEmail}");


        if ($response->getStatusCode() !== 200) {
            // Handle the API request failure
            return [];
        }

        $totalBets = json_decode($response->getBody(), true);

        return $totalBets;
    }
    public static function createBet(array $data)
    {
        $client = new Client();
        $response = $client->post('http://localhost:3000/bets', [
            'json' => $data,
        ]);

        $statusCode = $response->getStatusCode();
        $body = $response->getBody();

        return ['statusCode' => $statusCode, 'body' => $body];
    }
    public static function getUserData($email)
    {
        $client = new Client();
        $response = $client->get("http://localhost:3000/users/{$email}");


        if ($response->getStatusCode() !== 200) {
            // Handle the API request failure
            return [];
        }

        $user = json_decode($response->getBody(), true);

        return $user;
    }
    public static function getTopBetters()
    {
        $client = new Client();
        $response = $client->get("http://localhost:3000/bets/topBetters");


        if ($response->getStatusCode() !== 200) {
            // Handle the API request failure
            return [];
        }

        $topBetters = json_decode($response->getBody(), true);

        return $topBetters;
    }


}