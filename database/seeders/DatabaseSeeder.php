<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\CardList;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  const NUM_USERS = 10;

  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    User::factory()
      ->count(self::NUM_USERS)
      ->create();

    $boards = [
      Board::create(
        [
          'title' => 'Groceries',
          'color' => 'teal',
          'owner_id' => 1
        ]
      ),
      Board::create(
        [
          'title' => 'Work',
          'color' => 'orange',
          'owner_id' => 2
        ]
      ),
      Board::create(
        [
          'title' => 'Hobbies',
          'color' => 'indigo',
          'owner_id' => 1
        ]
      )
    ];

    collect($boards)->each(function (Board $board) {
      $lists = [
        CardList::create(
          [
            'title' => 'Todo',
            'board_id' => $board->id
          ]
        ),
        CardList::create(
          [
            'title' => 'In progress',
            'board_id' => $board->id
          ]
        ),
        CardList::create(
          [
            'title' => 'Completed',
            'board_id' => $board->id
          ]
        )
      ];

      collect($lists)->each(function (CardList $list) use ($board) {
        $order = 1;

        collect([
          'Buy groceries',
          'Take the dog for a walk',
          'Pay the bills',
          'Get the car fixed',
          'Write novel',
          'Buy food',
          'Paint a picture',
          'Create a course'
        ])->random(random_int(2, 5))->each(function (string $task) use ($board, $list, &$order) {
          $list->cards()->save(
            Card::make(
              [
                'title' => $task,
                'list_id' => $list->id,
                'owner_id' => $board->owner_id,
                'order' => $order++
              ]
            )
          );
        });
      });
    });
  }
}
