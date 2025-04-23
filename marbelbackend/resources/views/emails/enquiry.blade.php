@component('mail::message')
# New Enquiry Received

**Name:** {{ $enquiry->name }}  
**Email:** {{ $enquiry->email }}  
**Phone:** {{ $enquiry->phone }}  
**Product:** {{ $enquiry->product ?? 'N/A' }}  
**Message:**  
{{ $enquiry->message }}

Thanks,  
{{ config('app.name') }}
@endcomponent
