<?php

namespace App\Mail;

use App\Models\Enquire;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EnquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    public $enquiry;

    public function __construct(Enquire $enquiry)
    {
        $this->enquiry = $enquiry;
    }

    public function build()
    {
        return $this->subject('New Enquiry Received')
                    ->markdown('emails.enquiry');
    }
}
