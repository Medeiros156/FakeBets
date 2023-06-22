<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Make the POST request to the backend API
        $client = new Client();
        try {
            $response = $client->post('http://localhost:3000/users', [
                'json' => ['email' => $request->email],
            ]);

            // Check the response status
            if ($response->getStatusCode() === 201) {
                // The request was successful

                Auth::login($user);

                return redirect(RouteServiceProvider::HOME);
            } else {
                // The request failed
                return redirect()->back()->withErrors(['error' => 'Failed to create user.']);
            }
        } catch (RequestException $e) {
            // The request threw an exception
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}