import{_ as t,r as p,o,c as e,a as n,b as c,F as u,d as s,e as l}from"./app.aa4fcc9f.js";const i={},r=n("h1",{id:"upgrade-nonce",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#upgrade-nonce","aria-hidden":"true"},"#"),s(" Upgrade Nonce")],-1),k=s("Due to "),b={href:"https://solana.com/news/06-01-22-solana-mainnet-beta-outage-report-2",target:"_blank",rel:"noopener noreferrer"},m=s("2022/06/01 Solana outage"),g=s(". All nonce account should be upgraded. You can update it either"),d=l(`<ol><li>Advance Nonce (need origin authority signature)</li></ol><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;log&quot;</span>

	<span class="token string">&quot;github.com/blocto/solana-go-sdk/client&quot;</span>
	<span class="token string">&quot;github.com/blocto/solana-go-sdk/common&quot;</span>
	<span class="token string">&quot;github.com/blocto/solana-go-sdk/program/system&quot;</span>
	<span class="token string">&quot;github.com/blocto/solana-go-sdk/rpc&quot;</span>
	<span class="token string">&quot;github.com/blocto/solana-go-sdk/types&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// FUarP2p5EnxD66vVDL4PWRoWMzA56ZVHG24hpEDFShEz</span>
<span class="token keyword">var</span> feePayer<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> types<span class="token punctuation">.</span><span class="token function">AccountFromBase58</span><span class="token punctuation">(</span><span class="token string">&quot;4TMFNY9ntAn3CHzguSAvDNLPRoQTaK3sWbQQXdDXaE6KWRBLufGL6PJdsD2koiEe3gGmMdRK3aAw7sikGNksHJrN&quot;</span><span class="token punctuation">)</span>

<span class="token comment">// 9aE476sH92Vz7DMPyq5WLPkrKWivxeuTKEFKd2sZZcde</span>
<span class="token keyword">var</span> alice<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> types<span class="token punctuation">.</span><span class="token function">AccountFromBase58</span><span class="token punctuation">(</span><span class="token string">&quot;4voSPg3tYuWbKzimpQK9EbXHmuyy5fUrtXvpLDMLkmY6TRncaTHAKGD8jUg3maB5Jbrd9CkQg4qjJMyN6sQvnEF2&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span>rpc<span class="token punctuation">.</span>DevnetRPCEndpoint<span class="token punctuation">)</span>

	<span class="token comment">// get nonce account</span>
	nonceAccountPubkey <span class="token operator">:=</span> common<span class="token punctuation">.</span><span class="token function">PublicKeyFromString</span><span class="token punctuation">(</span><span class="token string">&quot;5Covh7EB4HtC5ieeP7GwUH9AHySMmNicBmvXo534wEA8&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// recent blockhash</span>
	recentBlockhashResponse<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetLatestBlockhash</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;failed to get recent blockhash, err: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// create a tx</span>
	tx<span class="token punctuation">,</span> err <span class="token operator">:=</span> types<span class="token punctuation">.</span><span class="token function">NewTransaction</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span>NewTransactionParam<span class="token punctuation">{</span>
		Signers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>types<span class="token punctuation">.</span>Account<span class="token punctuation">{</span>feePayer<span class="token punctuation">,</span> alice<span class="token punctuation">}</span><span class="token punctuation">,</span>
		Message<span class="token punctuation">:</span> types<span class="token punctuation">.</span><span class="token function">NewMessage</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span>NewMessageParam<span class="token punctuation">{</span>
			FeePayer<span class="token punctuation">:</span>        feePayer<span class="token punctuation">.</span>PublicKey<span class="token punctuation">,</span>
			RecentBlockhash<span class="token punctuation">:</span> recentBlockhashResponse<span class="token punctuation">.</span>Blockhash<span class="token punctuation">,</span>
			Instructions<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>types<span class="token punctuation">.</span>Instruction<span class="token punctuation">{</span>
				system<span class="token punctuation">.</span><span class="token function">AdvanceNonceAccount</span><span class="token punctuation">(</span>system<span class="token punctuation">.</span>AdvanceNonceAccountParam<span class="token punctuation">{</span>
					Nonce<span class="token punctuation">:</span> nonceAccountPubkey<span class="token punctuation">,</span>
					Auth<span class="token punctuation">:</span>  alice<span class="token punctuation">.</span>PublicKey<span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;failed to new a transaction, err: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	sig<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">SendTransaction</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> tx<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;failed to send tx, err: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;txhash&quot;</span><span class="token punctuation">,</span> sig<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><ol start="2"><li>Upgrade Nonce (you can use a random fee payer)</li></ol><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;log&quot;</span>

	<span class="token string">&quot;github.com/blocto/solana-go-sdk/client&quot;</span>
	<span class="token string">&quot;github.com/blocto/solana-go-sdk/common&quot;</span>
	<span class="token string">&quot;github.com/blocto/solana-go-sdk/program/system&quot;</span>
	<span class="token string">&quot;github.com/blocto/solana-go-sdk/rpc&quot;</span>
	<span class="token string">&quot;github.com/blocto/solana-go-sdk/types&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// FUarP2p5EnxD66vVDL4PWRoWMzA56ZVHG24hpEDFShEz</span>
<span class="token keyword">var</span> feePayer<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> types<span class="token punctuation">.</span><span class="token function">AccountFromBase58</span><span class="token punctuation">(</span><span class="token string">&quot;4TMFNY9ntAn3CHzguSAvDNLPRoQTaK3sWbQQXdDXaE6KWRBLufGL6PJdsD2koiEe3gGmMdRK3aAw7sikGNksHJrN&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span>rpc<span class="token punctuation">.</span>DevnetRPCEndpoint<span class="token punctuation">)</span>

	nonceAccountPubkey <span class="token operator">:=</span> common<span class="token punctuation">.</span><span class="token function">PublicKeyFromString</span><span class="token punctuation">(</span><span class="token string">&quot;DJyNpXgggw1WGgjTVzFsNjb3fuQZVMqhoakvSBfX9LYx&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// recent blockhash</span>
	recentBlockhashResponse<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetLatestBlockhash</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;failed to get recent blockhash, err: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	tx<span class="token punctuation">,</span> err <span class="token operator">:=</span> types<span class="token punctuation">.</span><span class="token function">NewTransaction</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span>NewTransactionParam<span class="token punctuation">{</span>
		Signers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>types<span class="token punctuation">.</span>Account<span class="token punctuation">{</span>feePayer<span class="token punctuation">}</span><span class="token punctuation">,</span>
		Message<span class="token punctuation">:</span> types<span class="token punctuation">.</span><span class="token function">NewMessage</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span>NewMessageParam<span class="token punctuation">{</span>
			FeePayer<span class="token punctuation">:</span>        feePayer<span class="token punctuation">.</span>PublicKey<span class="token punctuation">,</span>
			RecentBlockhash<span class="token punctuation">:</span> recentBlockhashResponse<span class="token punctuation">.</span>Blockhash<span class="token punctuation">,</span>
			Instructions<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>types<span class="token punctuation">.</span>Instruction<span class="token punctuation">{</span>
				system<span class="token punctuation">.</span><span class="token function">UpgradeNonceAccount</span><span class="token punctuation">(</span>system<span class="token punctuation">.</span>UpgradeNonceAccountParam<span class="token punctuation">{</span>
					NonceAccountPubkey<span class="token punctuation">:</span> nonceAccountPubkey<span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;failed to new a transaction, err: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	sig<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">SendTransaction</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> tx<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;failed to send tx, err: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;txhash&quot;</span><span class="token punctuation">,</span> sig<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div>`,4);function f(h,y){const a=p("ExternalLinkIcon");return o(),e(u,null,[r,n("p",null,[k,n("a",b,[m,c(a)]),g]),d],64)}var P=t(i,[["render",f]]);export{P as default};