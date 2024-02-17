<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Protocol;

class ProtocolsTable extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Protocol::create([
            'department' => 'Protocol Department',
            'description' => 'The Protocol Department stands as a cornerstone within the intricate structure of our church, serving as a dedicated force in the realms of hospitality and organization. This vital department plays a pivotal role in ensuring that our services unfold seamlessly and radiate a welcoming atmosphere to all who enter our doors. In every facet of our gatherings, the Protocol Department embodies a spirit of excellence, upholding the highest standards of service and commitment to our church community.

            At the heart of the Protocol Department\'s mission is the commitment to creating an environment where every individual, from newcomers to long-standing members, feels not only welcomed but also embraced. Their role extends beyond mere logistics; they are the architects of a warm and inviting space where fellowship flourishes, and connections are forged.',
            'leader' => 'Pastor Gbemisola',
            // ... other fields ...
        ]);
    }
}