<script>
  import { wallet, profile } from '../store/Wallet2';
</script>
<a href="#" class="flex-shrink-0 group block">
  <div class="flex items-center">
    <div>
      <img class="inline-block h-10 w-10 rounded-full" src={"https://api.lorem.space/image/face?hash="+$wallet} alt="" />
    </div>
    <div class="ml-3">
      <p class="text-base leading-6 font-medium text-white">
        {$profile}
      </p>
      <p class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
        @{$profile}
      </p>
    </div>
  </div>
</a>