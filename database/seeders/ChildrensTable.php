<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Children;

class ChildrensTable extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Children::create([
            'department' => 'Children’s Department',
            'description' => 'The Children\'s Department holds a pivotal role in our church, acting as a cornerstone ministry that shapes the spiritual foundation of our youngest members. Dedicated to the growth and nurturing of young hearts, this department provides a vibrant and engaging space for kids to discover and understand the teachings of the Lord.
            
            In this dynamic and interactive environment, children embark on a journey of faith exploration, finding joy and excitement in learning about God\'s love. Through age-appropriate lessons, creative activities, and a supportive community, the Children\'s Department aims to create a lasting impact on the spiritual development of each child.
          
            Our commitment goes beyond traditional Sunday school; we strive to make the learning experience memorable, fostering a sense of wonder and curiosity about the divine. The Children\'s Department is not just an educational space; it\'s a place where children build friendships, explore their unique gifts, and begin forming a lifelong relationship with God.
           
            As a cornerstone ministry, the Children\'s Department contributes to the vibrancy of our church community. It is a space where families come together, where parents actively participate in the spiritual growth of their children, and where the bonds formed among the young members extend beyond the classroom.
            
            In essence, the Children\'s Department stands as a testament to our commitment to the next generation. It\'s a ministry where faith is cultivated, love is shared, and the seeds of spiritual understanding are planted, ensuring that our children grow up with a strong foundation in the teachings of the Lord.',
            'leader' => 'Mommy Asemota',
            // ... other fields ...
        ]);
    }
}