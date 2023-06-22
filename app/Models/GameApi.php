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
            $apiUrl = env('API_URL');
            $response = $client->get($apiUrl . 'games');

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
            $apiUrl = env('API_URL');
            $response = $client->get($apiUrl . 'games/history');

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
        $apiUrl = env('API_URL');
        $response = $client->get($apiUrl . "bets/user/{$userEmail}");


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
        $apiUrl = env('API_URL');
        $response = $client->get($apiUrl . "bets/total/{$userEmail}");


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
        $apiUrl = env('API_URL');
        $response = $client->post($apiUrl . 'bets', [
            'json' => $data,
        ]);

        $statusCode = $response->getStatusCode();
        $body = $response->getBody();

        return ['statusCode' => $statusCode, 'body' => $body];
    }
    public static function getUserData($email)
    {
        $client = new Client();
        $apiUrl = env('API_URL');
        $response = $client->get($apiUrl . "users/{$email}");


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
        $apiUrl = env('API_URL');
        $response = $client->get($apiUrl . "bets/topBetters");


        if ($response->getStatusCode() !== 200) {
            // Handle the API request failure
            return [];
        }

        $topBetters = json_decode($response->getBody(), true);

        return $topBetters;
    }


}